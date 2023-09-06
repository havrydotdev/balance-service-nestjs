import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions/transactions.service.js';
import { TransactionsController } from './controllers/transactions/transactions.controller.js';
import { transactionsRepository } from './repository/transactions.repository.js';
import { UsersModule } from '../users/users.module.js';
import TransactionsHooks from './hooks/transactions.hooks.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule, HttpModule],
  providers: [TransactionsService, transactionsRepository, TransactionsHooks],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
