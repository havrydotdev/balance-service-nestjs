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
import Transaction from 'src/transactions/entities/transaction.entity';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @IsEmail
  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Default(0)
  @Column
  balance: number;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
