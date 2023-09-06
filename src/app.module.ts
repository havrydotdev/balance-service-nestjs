import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt/jwt-auth.guard.js';
import { databaseProviders } from './providers/database.provider.js';
import { TransactionsModule } from './transactions/transactions.module.js';

@Module({
  imports: [UsersModule, AuthModule, TransactionsModule],
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
