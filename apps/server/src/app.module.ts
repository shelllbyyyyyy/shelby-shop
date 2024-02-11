import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LoggerMiddleware } from '@/core/logger/logger.middleware';
import { SupabaseModule } from '@/core/auth/supabase/supabase.module';

@Module({
  imports: [PassportModule, SupabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
