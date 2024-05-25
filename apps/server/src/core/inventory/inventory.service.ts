import { PrismaService } from "@/lib/prisma.service";
import { Injectable } from "@nestjs/common";
import { InventoryStatus, Prisma } from "@shelby/db";
import { UpdateInventoryDTO } from "@shelby/dto";

@Injectable()
export class InventoryService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllInventory() {
    return await this.prismaService.inventory.findMany({
      include: { productVariant: { include: { product: true } } },
    });
  }

  public async getInventory(id: string) {
    return await this.prismaService.inventory.findUnique({ where: { id }, include: { productVariant: { select: { label: true, sku: true } } } });
  }

  public async updateInventory(id: string, quantity: number, status: InventoryStatus) {
    const updatePayload: Prisma.InventoryUpdateInput = { quantity, status };

    return await this.prismaService.inventory.update({
      where: { id },
      data: {
        quantity: updatePayload.quantity,
        status: updatePayload.status,
      },
    });
  }
}
