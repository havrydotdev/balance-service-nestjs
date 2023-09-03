import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  PrimaryKey,
  Table,
  DataType,
  Model,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
export default class Transaction extends Model {
  @ApiProperty({
    type: 'number',
    nullable: false,
    description: 'Transaction id',
    example: 1,
  })
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ApiProperty({
    type: 'string',
    nullable: false,
    description: 'Transaction description',
    example: 'Debit by purchase 300EUR',
  })
  @AllowNull(false)
  @Column
  desc: string;

  @ApiProperty({
    type: 'number',
    nullable: false,
    description: 'Transaction value',
    example: 300,
  })
  @AllowNull(false)
  @Column
  value: number;

  @ApiProperty({
    enum: ['transfer', 'debit', 'top-up'],
    nullable: false,
    description: 'Transaction type',
    enumName: 'TransactionType',
    example: 'transfer',
  })
  @AllowNull(false)
  @Column(DataType.ENUM('transfer', 'debit', 'top-up'))
  type: TransactionType;

  @ApiProperty({
    type: 'number',
    nullable: false,
    description: 'Transaction owner`s id',
    example: 1,
  })
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @ApiProperty({
    type: () => User,
    nullable: true,
    description: "Transaction owner's id (isn't returned with transactions)",
  })
  @BelongsTo(() => User)
  user: User;
}
