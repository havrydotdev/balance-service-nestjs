import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import ErrorResponse from '../../../dto/error.dto';
import {
  ReqCreateTransactionDto,
  ReqCreateTransferDto,
} from '../../../transactions/dto/create-transaction.dto';
import Transaction from '../../../transactions/entities/transaction.entity';
import { TransactionsService } from '../../../transactions/services/transactions/transactions.service';
import { UsersService } from '../../../users/services/users/users.service';
import {
  genDebitDesc,
  genTopUpDesc,
  genTransferFromDesc,
  genTransferToDesc,
} from '../../../utils/transaction-desc';

@ApiBearerAuth()
@ApiTags('transactions')
@Controller('transactions')
@ApiInternalServerErrorResponse({
  type: () => ErrorResponse,
  description: 'Something went wrong',
})
@ApiUnauthorizedResponse({
  type: () => ErrorResponse,
  description: 'User isn`t authorized',
})
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOkResponse({
    type: () => Transaction,
  })
  @HttpCode(HttpStatus.OK)
  @Post('top-up')
  async createTopUp(
    @Req() req: FastifyRequest,
    @Body() dto: ReqCreateTransactionDto,
  ): Promise<Transaction> {
    const topUp = await this.transactionsService.create({
      userId: req.user.id,
      type: 'top-up',
      desc: genTopUpDesc(dto.value),
      value: dto.value,
    });

    return topUp;
  }

  @ApiOkResponse({
    type: () => Transaction,
  })
  @HttpCode(HttpStatus.OK)
  @Post('debit')
  async createDebit(
    @Req() req: FastifyRequest,
    @Body() dto: ReqCreateTransactionDto,
  ): Promise<Transaction> {
    const debit = await this.transactionsService.create({
      userId: req.user.id,
      type: 'debit',
      desc: genDebitDesc(dto.value),
      value: -dto.value,
    });

    return debit;
  }

  @ApiOkResponse({
    type: () => Transaction,
  })
  @HttpCode(HttpStatus.OK)
  @Post('transfer')
  async createTransfer(
    @Req() req: FastifyRequest,
    @Body() dto: ReqCreateTransferDto,
  ): Promise<Transaction> {
    const from = await this.usersService.findById(req.user.id);
    const to = await this.usersService.findById(dto.toId);
    if (!to) {
      throw new BadRequestException({
        message: 'Receiver does not exist',
      });
    }

    const tr = await this.transactionsService.create({
      desc: genTransferToDesc(dto.value, to.name),
      userId: req.user.id,
      type: 'transfer',
      value: -dto.value,
    });

    await this.transactionsService.create({
      desc: genTransferFromDesc(dto.value, from.name),
      userId: dto.toId,
      type: 'transfer',
      value: dto.value,
    });

    return tr;
  }

  @ApiOkResponse({
    type: () => [Transaction],
  })
  @ApiQuery({
    name: 'currency',
    required: false,
    example: 'UAH',
    description:
      'Currency that api will convert all transactions values to (defaults to EUR)',
  })
  @Get()
  async getAllByUser(
    @Req() req: FastifyRequest,
    @Query('currency') curr: string,
  ): Promise<Transaction[]> {
    const transactions = await this.transactionsService.findAllByUser(
      req.user.id,
    );

    if (curr) {
      const rate = await this.transactionsService.getRates(curr);
      transactions.forEach((tr) => (tr.value *= rate));
    }

    return transactions;
  }

  @ApiOkResponse({
    type: () => Transaction,
  })
  @ApiQuery({
    name: 'currency',
    required: false,
    example: 'UAH',
    description:
      'Currency that api will convert all transactions values to (defaults to EUR)',
  })
  @Get(':id')
  async getById(
    @Req() req: FastifyRequest,
    @Param('id', ParseIntPipe) id: number,
    @Query('currency') curr: string,
  ): Promise<Transaction> {
    const tr = await this.transactionsService.findById(id, req.user.id);
    if (curr) {
      const rate = await this.transactionsService.getRates(curr);
      tr.value *= rate;
    }

    return tr;
  }
}
