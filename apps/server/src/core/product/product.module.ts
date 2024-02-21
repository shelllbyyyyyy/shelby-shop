import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductContoller } from "./product.controller";

import { PrismaService } from "@/lib/prisma.service";
import { SupabaseService } from "@/lib/supabase.service";

@Module({
  imports: [],
  controllers: [ProductContoller],
  providers: [ProductService, PrismaService, SupabaseService],
})
export class ProductModule {}
