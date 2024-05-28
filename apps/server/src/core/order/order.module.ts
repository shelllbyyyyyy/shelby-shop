import { Module } from "@nestjs/common";

import { PrismaService } from "@/lib/prisma.service";
import { SupabaseService } from "@/lib/supabase.service";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, SupabaseService],
})
export class OrderModule {}
