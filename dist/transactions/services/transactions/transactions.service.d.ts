import { HttpService } from '@nestjs/axios';
import CreateTransactionDto from 'src/transactions/dto/create-transaction.dto';
import Transaction from 'src/transactions/entities/transaction.entity';
export declare class TransactionsService {
    private readonly transactionsRepo;
    private readonly httpService;
    private readonly logger;
    constructor(transactionsRepo: typeof Transaction, httpService: HttpService);
    getRates(to: string): Promise<any>;
    findAllByUser(userId: number): Promise<Transaction[]>;
    findById(id: number, userId: number): Promise<Transaction>;
    create(dto: CreateTransactionDto): Promise<Transaction>;
}
