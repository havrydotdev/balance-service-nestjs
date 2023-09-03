import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { EXCHANGES_API_KEY, TRANSACTIONS_REPOSITORY } from 'src/constants';
import CreateTransactionDto from 'src/transactions/dto/create-transaction.dto';
import Transaction from 'src/transactions/entities/transaction.entity';
import { AxiosError } from 'axios';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);
  constructor(
    @Inject(TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepo: typeof Transaction,
    private readonly httpService: HttpService,
  ) {}

  async getRates(to: string) {
    const response = await firstValueFrom(
      this.httpService
        .get(
          `http://api.exchangeratesapi.io/v1/latest?access_key=${EXCHANGES_API_KEY}&base=EUR&symbols=${to}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return response.data.rates;
  }

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
