import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  NotEquals,
} from 'class-validator';

export class ReqCreateTransactionDto {
  @ApiProperty({
    required: true,
    type: 'number',
    title: 'value',
    description: 'Value of transaction in EUR',
    example: 300,
  })
  @IsNumber()
  @NotEquals(0)
  @IsNotEmpty()
  value: number;
}

export class ReqCreateTransferDto {
  @ApiProperty({
    required: true,
    type: 'number',
    title: 'value',
    description: 'Value of transaction in EUR',
    example: 300,
  })
  @IsNumber()
  @NotEquals(0)
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    required: true,
    type: 'number',
    title: 'toId',
    description: 'Id of transfer recepient',
    example: 1,
  })
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
