import { TRANSACTIONS_REPOSITORY } from '../../constants.js';
import Transaction from '../entities/transaction.entity.js';

export const transactionsRepository = {
  provide: TRANSACTIONS_REPOSITORY,
  useValue: Transaction,
};
