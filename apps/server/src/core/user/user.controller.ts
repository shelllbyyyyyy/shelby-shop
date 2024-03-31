import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";

import { SupabaseGuard } from "@/core/auth/supabase/supabase.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserContoller {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(SupabaseGuard)
  public async getAllProduct() {
    return await this.userService.getAllUser();
  }

  @Delete("/:id")
  @UseGuards(SupabaseGuard)
  public async deleteProduct(@Param("id") id: string) {
    await this.userService.deleteUser(id);
  }
}
