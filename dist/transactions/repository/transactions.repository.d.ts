import Transaction from '../entities/transaction.entity';
export declare const transactionsRepository: {
    provide: string;
    useValue: typeof Transaction;
};
