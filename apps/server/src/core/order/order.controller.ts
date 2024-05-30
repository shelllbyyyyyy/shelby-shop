import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { SupabaseGuard } from "@/core/auth/supabase/supabase.guard";
import { OrderService } from "./order.service";
import { User } from "../auth/user.decorator";
import { AuthUser } from "../auth/types";
import { CheckoutDTO, SuccessDTO } from "@shelby/dto";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("/get-token")
  @UseGuards(SupabaseGuard)
  public async getSnapToken(@User() user: AuthUser, @Body() checkoutDTO: CheckoutDTO) {
    return await this.orderService.getSnapToken(user.sub, checkoutDTO);
  }

  @Post("/success")
  @UseGuards(SupabaseGuard)
  public async orderSuccess(@User() user: AuthUser, @Body() payload: SuccessDTO) {
    const success = await this.orderService.paymentSuccess(user.sub, payload);

    return success;
  }
}
