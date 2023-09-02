import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt/jwt-auth.guard';
import { databaseProviders } from './providers/database.provider';
import { TransactionsModule } from './transactions/transactions.module';

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
