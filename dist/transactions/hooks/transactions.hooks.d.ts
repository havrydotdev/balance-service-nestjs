import { OnModuleInit } from '@nestjs/common';
import Transaction from '../entities/transaction.entity';
import { UsersService } from 'src/users/services/users/users.service';
export default class TransactionsHooks implements OnModuleInit {
    private readonly transactionsRepo;
    private readonly usersService;
    constructor(transactionsRepo: typeof Transaction, usersService: UsersService);
    onModuleInit(): void;
}
