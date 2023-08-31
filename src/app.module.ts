import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt/jwt-auth.guard';
import { databaseProviders } from './providers/database.provider';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ...databaseProviders,
  ],
  exports: [...databaseProviders],
})
export class AppModule {}
