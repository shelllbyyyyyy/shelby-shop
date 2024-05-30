import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";

import { CartService } from "./cart.service";
import { SupabaseGuard } from "@/core/auth/supabase/supabase.guard";
import { User } from "@/core/auth/user.decorator";
import { AuthUser } from "@/core/auth/types";
import { AddToCartDTO, UpdateCartDTO } from "@shelby/dto";

@Controller("cart")
export class CartContoller {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(SupabaseGuard)
  public async getCart(@User() user: AuthUser) {
    return await this.cartService.getCart(user.sub);
  }

  @Post()
  @UseGuards(SupabaseGuard)
  public async addToCart(@Body() addToCartDTO: AddToCartDTO, @User() user: AuthUser) {
    return await this.cartService.addToCart(addToCartDTO.id, addToCartDTO.quantity, user.sub);
  }

  @Patch()
  @UseGuards(SupabaseGuard)
  public async updateCart(@Body() updateCartDTO: UpdateCartDTO) {
    return await this.cartService.updateCart(updateCartDTO.productVariantId, updateCartDTO.quantity, updateCartDTO.cartId);
  }

  @Patch("/:id")
  @UseGuards(SupabaseGuard)
  public async deleteCart(@User() user: AuthUser, @Param("id") id: string) {
    return await this.cartService.deleteItem(user.sub, id);
  }
}
