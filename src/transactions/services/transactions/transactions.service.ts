import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TRANSACTIONS_REPOSITORY } from 'src/constants';
import CreateTransactionDto from 'src/transactions/dto/create-transaction.dto';
import Transaction from 'src/transactions/entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepo: typeof Transaction,
  ) {}

  async findAllByUser(userId: number): Promise<Transaction[]> {
    return this.transactionsRepo.findAll({
      where: { userId: userId },
    });
  }

  async findById(id: number, userId: number): Promise<Transaction> {
    const transaction = await this.transactionsRepo.findByPk(id);

    if (transaction.userId !== userId) {
      throw new UnauthorizedException({
        message: 'You don`t have access to this transaction',
      });
    }

    return transaction;
  }

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const transaction = await this.transactionsRepo.create({
      ...dto,
    });

    return transaction;
  }
}
