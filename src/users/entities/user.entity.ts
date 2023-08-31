import {
  AutoIncrement,
  Column,
  IsEmail,
  PrimaryKey,
  Table,
  Unique,
  Model,
  AllowNull,
} from 'sequelize-typescript';

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
  @Column
  balance: number;
}
