import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  NotEquals,
} from 'class-validator';

export default class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNumber()
  @NotEquals(0)
  @IsNotEmpty()
  value: number;

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
