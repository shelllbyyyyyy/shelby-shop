import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@shelby/db';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    const tablenames = await this.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    tablenames
      .map(({ tablename }) => tablename)
      .filter((name) => name !== '_prisma_migrations')
      .map((name) => `"public"."${name}"`)
      .join(', ');

    try {
      await this.$transaction([
        ...tablenames.map((table) => {
          return this.$executeRawUnsafe(
            `TRUNCATE "public"."${table.tablename}" RESTART IDENTITY CASCADE;`,
          );
        }),
      ]);
    } catch (error) {
      console.log({ error });
    }
  }
}
