import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { SupabaseModule } from "@/core/auth/supabase/supabase.module";
import { LoggerMiddleware } from "@/core/logger/logger.middleware";
import { ProductModule } from "@/core/product/product.module";
import { ProfileModule } from "@/core/profile/profile.module";
import { UserModule } from "@/core/user/user.module";
import { CategoryModule } from "@/core/category/category.module";
import { BillboardModule } from "@/core/billboard/billboard.module";
import { CartModule } from "@/core/cart/cart.module";
import { InventoryModule } from "@/core/inventory/inventory.module";
import { OrderModule } from "./core/order/order.module";
import { MidtransModule } from "./lib/midtrans/midtrans.module";
import { config } from "./config";

@Module({
  imports: [
    MidtransModule.register({
      clientKey: config.midClientKey,
      serverKey: config.midServerKey,
      merchantId: config.midMerchantID,
      sandbox: true,
      isGlobal: true, // default: false, register module globally
    }),
    OrderModule,
    InventoryModule,
    CartModule,
    PassportModule,
    SupabaseModule,
    CategoryModule,
    BillboardModule,
    ProfileModule,
    ProductModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
