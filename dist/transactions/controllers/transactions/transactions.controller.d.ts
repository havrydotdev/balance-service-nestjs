import { FastifyRequest } from 'fastify';
import { ReqCreateTransactionDto, ReqCreateTransferDto } from 'src/transactions/dto/create-transaction.dto';
import Transaction from 'src/transactions/entities/transaction.entity';
import { TransactionsService } from 'src/transactions/services/transactions/transactions.service';
import { UsersService } from 'src/users/services/users/users.service';
export declare class TransactionsController {
    private readonly transactionsService;
    private readonly usersService;
    constructor(transactionsService: TransactionsService, usersService: UsersService);
    createTopUp(req: FastifyRequest, dto: ReqCreateTransactionDto): Promise<Transaction>;
    createDebit(req: FastifyRequest, dto: ReqCreateTransactionDto): Promise<Transaction>;
    createTransfer(req: FastifyRequest, dto: ReqCreateTransferDto): Promise<Transaction>;
    getAllByUser(req: FastifyRequest, curr: string): Promise<Transaction[]>;
    getById(req: FastifyRequest, id: number, curr: string): Promise<Transaction>;
}
