import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { SupabaseModule } from "@/core/auth/supabase/supabase.module";
import { LoggerMiddleware } from "@/core/logger/logger.middleware";
import { ProductModule } from "@/core/product/product.module";
import { ProfileModule } from "@/core/profile/profile.module";
import { UserModule } from "@/core/user/user.module";

@Module({
  imports: [PassportModule, SupabaseModule, ProfileModule, ProductModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
