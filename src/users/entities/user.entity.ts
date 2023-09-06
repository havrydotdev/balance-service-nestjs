import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  Column,
  IsEmail,
  PrimaryKey,
  Table,
  Unique,
  Model,
  AllowNull,
  Default,
  HasMany,
} from 'sequelize-typescript';
import Transaction from '../../transactions/entities/transaction.entity.js';

@Table
export class User extends Model {
  @ApiProperty({
    type: 'number',
    nullable: false,
    description: 'User id',
    example: 1,
  })
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ApiProperty({
    type: 'string',
    nullable: false,
    description: 'User name',
    example: 'Wade Allen',
  })
  @AllowNull(false)
  @Column
  name: string;

  @ApiProperty({
    type: 'string',
    nullable: false,
    description: 'User email',
    example: 'example@gmail.com',
  })
  @IsEmail
  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @ApiProperty({
    type: 'string',
    nullable: false,
    description: "User password (isn't returned in getProfile method)",
    example: 'secret_password',
  })
  @AllowNull(false)
  @Column
  password: string;

  @ApiProperty({
    type: 'number',
    nullable: false,
    description: 'User balance',
    example: 300,
  })
  @AllowNull(false)
  @Default(0)
  @Column
  balance: number;

  @ApiProperty({
    isArray: true,
    type: () => Transaction,
    nullable: false,
    description: "User transactions (isn't returned with user)",
  })
  @HasMany(() => Transaction)
  transactions: Transaction[];
}
