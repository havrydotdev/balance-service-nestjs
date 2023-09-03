import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  NotEquals,
} from 'class-validator';

export class ReqCreateTransactionDto {
  @IsNumber()
  @NotEquals(0)
  @IsNotEmpty()
  value: number;
}

export class ReqCreateTransferDto {
  @IsNumber()
  @NotEquals(0)
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @NotEquals(0)
  @IsPositive()
  @IsNumber()
  toId: number;
}

export default class CreateTransactionDto extends ReqCreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsString()
  @IsIn(['transfer', 'debit', 'top-up'])
  @IsNotEmpty()
  type: TransactionType;

  @IsNotEmpty()
  @NotEquals(0)
  @IsPositive()
  @IsNumber()
  userId: number;
}
