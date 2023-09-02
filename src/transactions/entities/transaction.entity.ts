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
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  desc: string;

  @AllowNull(false)
  @Column
  value: number;

  @AllowNull(false)
  @Column(DataType.ENUM('transfer', 'debit', 'top-up'))
  type: TransactionType;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
