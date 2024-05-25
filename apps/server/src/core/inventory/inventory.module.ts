import { Module } from "@nestjs/common";
import { InventoryContoller } from "./inventory.controller";
import { InventoryService } from "./Inventory.service";
import { PrismaService } from "@/lib/prisma.service";

@Module({
  imports: [],
  controllers: [InventoryContoller],
  providers: [InventoryService, PrismaService],
})
export class InventoryModule {}
