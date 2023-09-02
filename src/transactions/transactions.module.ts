import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions/transactions.service';
import { TransactionsController } from './controllers/transactions/transactions.controller';
import { transactionsRepository } from './repository/transactions.repository';
import { UsersModule } from 'src/users/users.module';
import TransactionsHooks from './hooks/transactions.hooks';

@Module({
  imports: [UsersModule],
  providers: [TransactionsService, transactionsRepository, TransactionsHooks],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
