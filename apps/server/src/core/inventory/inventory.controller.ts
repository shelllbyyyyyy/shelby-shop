import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";

import { InventoryService } from "./Inventory.service";
import { SupabaseGuard } from "../auth/supabase/supabase.guard";
import { UpdateInventoryDTO } from "@shelby/dto";

@Controller("inventory")
export class InventoryContoller {
  constructor(private readonly InventoryService: InventoryService) {}

  @Get("/:id")
  @UseGuards(SupabaseGuard)
  public async getInventory(@Param("id") id: string) {
    return await this.InventoryService.getInventory(id);
  }

  @Get()
  @UseGuards(SupabaseGuard)
  public async getAllInventory(id: string) {
    return await this.InventoryService.getAllInventory();
  }

  @Patch("/:id")
  @UseGuards(SupabaseGuard)
  public async updateInventory(@Param("id") id: string, @Body() updateInventoryDTO: UpdateInventoryDTO) {
    return await this.InventoryService.updateInventory(id, updateInventoryDTO.quantity, updateInventoryDTO.status);
  }
}
