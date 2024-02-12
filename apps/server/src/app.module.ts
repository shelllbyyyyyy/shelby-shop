import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { LoggerMiddleware } from "@/core/logger/logger.middleware";
import { SupabaseModule } from "@/core/auth/supabase/supabase.module";
import { ProfileModule } from "@/core/profile/profile.module";

@Module({
  imports: [PassportModule, SupabaseModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
