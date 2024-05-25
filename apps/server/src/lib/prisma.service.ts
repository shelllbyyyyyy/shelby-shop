import { Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@shelby/db";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  interactiveTransaction<R>(
    fn: (prisma: Prisma.TransactionClient) => Promise<R>,
    options?: {
      maxWait?: number | undefined;
      timeout?: number | undefined;
      isolationLevel?: Prisma.TransactionIsolationLevel | undefined;
    },
    numRetries = 1,
  ): Promise<R> {
    let result: Promise<R> | null = null;

    for (let i = 0; i < numRetries; i++) {
      try {
        result = this.$transaction(fn, options);
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          //TODO?
        } else {
          throw e;
        }
      }

      if (result != null) {
        return result;
      }
    }

    throw new Error("No result in transaction after maximum number of retries.");
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === "production") return;

    const tablenames = await this.$queryRaw<Array<{ tablename: string }>>`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    tablenames
      .map(({ tablename }) => tablename)
      .filter(name => name !== "_prisma_migrations")
      .map(name => `"public"."${name}"`)
      .join(", ");

    try {
      await this.$transaction([
        ...tablenames.map(table => {
          return this.$executeRawUnsafe(`TRUNCATE "public"."${table.tablename}" RESTART IDENTITY CASCADE;`);
        }),
      ]);
    } catch (error) {
      console.log({ error });
    }
  }
}
