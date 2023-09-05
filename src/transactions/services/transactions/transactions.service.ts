import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { EXCHANGES_API_KEY, TRANSACTIONS_REPOSITORY } from '../../../constants';
import CreateTransactionDto from '../../../transactions/dto/create-transaction.dto';
import Transaction from '../../../transactions/entities/transaction.entity';
import { AxiosError } from 'axios';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);
  constructor(
    @Inject(TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepo: typeof Transaction,
    private readonly httpService: HttpService,
  ) {}

  async getRates(to: string): Promise<number> {
    const response = await firstValueFrom(
      this.httpService
        .get(
          `http://api.exchangeratesapi.io/v1/latest?access_key=${EXCHANGES_API_KEY}&base=EUR&symbols=${to}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new InternalServerErrorException({
              message: 'An error happened!',
            });
          }),
        ),
    );

    if (response.data.error) {
      throw new HttpException(
        {
          message: response.data.error.info,
        },
        response.data.status,
      );
    }

    return response.data.rates[to];
  }

  async findAllByUser(userId: number): Promise<Transaction[]> {
    return this.transactionsRepo.findAll({
      where: { userId: userId },
    });
  }

  async findById(id: number, userId: number): Promise<Transaction> {
    const transaction = await this.transactionsRepo.findByPk(id);

    if (transaction.userId !== userId) {
      this.logger.error(
        `User does not own this transaction (expected userId to equal ${transaction.userId}, got ${userId})`,
      );
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
