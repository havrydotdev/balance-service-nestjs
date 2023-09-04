import { TRANSACTIONS_REPOSITORY } from '../../constants';
import Transaction from '../entities/transaction.entity';

export const transactionsRepository = {
  provide: TRANSACTIONS_REPOSITORY,
  useValue: Transaction,
};
