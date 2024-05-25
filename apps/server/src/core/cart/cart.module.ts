import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartContoller } from "./cart.controller";

import { PrismaService } from "@/lib/prisma.service";

@Module({
  imports: [],
  controllers: [CartContoller],
  providers: [CartService, PrismaService],
})
export class CartModule {}
