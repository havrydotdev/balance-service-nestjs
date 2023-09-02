import { TRANSACTIONS_REPOSITORY } from 'src/constants';
import Transaction from '../entities/transaction.entity';

export const transactionsRepository = {
  provide: TRANSACTIONS_REPOSITORY,
  useValue: Transaction,
};
