import { Module } from "@nestjs/common";

import { PrismaService } from "@/lib/prisma.service";

import { UserService } from "./user.service";
import { UserContoller } from "./user.controller";

@Module({
  imports: [],
  controllers: [UserContoller],
  providers: [UserService, PrismaService],
})
export class UserModule {}
