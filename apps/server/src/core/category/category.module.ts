import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryContoller } from "./category.controller";

import { PrismaService } from "@/lib/prisma.service";
import { SupabaseService } from "@/lib/supabase.service";

@Module({
  imports: [],
  controllers: [CategoryContoller],
  providers: [CategoryService, PrismaService, SupabaseService],
})
export class CategoryModule {}
