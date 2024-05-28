import { Body, Controller, Get, MaxFileSizeValidator, NotFoundException, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";

import { SupabaseGuard } from "@/core/auth/supabase/supabase.guard";
import { OrderService } from "./order.service";
import { User } from "../auth/user.decorator";
import { AuthUser } from "../auth/types";
import { CheckoutDTO } from "@shelby/dto";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("/token")
  @UseGuards(SupabaseGuard)
  public async getSnapToken(@User() user: AuthUser, @Body() checkoutDTO: CheckoutDTO) {
    const body = { ...checkoutDTO };

    const order = await this.orderService.getSnapToken(user.sub, body.items);

    return order;
  }

  @Post("/success")
  @UseGuards(SupabaseGuard)
  public async orderSuccess(@User() user: AuthUser) {
    return await this.orderService.paymentSuccess(user.sub);
  }
}
