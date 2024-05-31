import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";

import { InventoryService } from "./inventory.service";
import { SupabaseGuard } from "../auth/supabase/supabase.guard";
import { UpdateInventoryDTO } from "@shelby/dto";

@Controller("inventory")
export class InventoryContoller {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get("/:id")
  @UseGuards(SupabaseGuard)
  public async getInventory(@Param("id") id: string) {
    return await this.inventoryService.getInventory(id);
  }

  @Get()
  @UseGuards(SupabaseGuard)
  public async getAllInventory(id: string) {
    return await this.inventoryService.getAllInventory();
  }

  @Patch("/:id")
  @UseGuards(SupabaseGuard)
  public async updateInventory(@Param("id") id: string, @Body() updateInventoryDTO: UpdateInventoryDTO) {
    return await this.inventoryService.updateInventory(id, updateInventoryDTO.quantity, updateInventoryDTO.status);
  }
}
