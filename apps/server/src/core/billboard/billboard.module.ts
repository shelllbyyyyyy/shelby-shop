import { Module } from "@nestjs/common";
import { BillboardService } from "./billboard.service";
import { BillboardContoller } from "./billboard.controller";

import { PrismaService } from "@/lib/prisma.service";
import { SupabaseService } from "@/lib/supabase.service";

@Module({
  imports: [],
  controllers: [BillboardContoller],
  providers: [BillboardService, PrismaService, SupabaseService],
})
export class BillboardModule {}
