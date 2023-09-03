import { Model } from 'sequelize-typescript';
import Transaction from 'src/transactions/entities/transaction.entity';
export declare class User extends Model {
    id: number;
    name: string;
    email: string;
    password: string;
    balance: number;
    transactions: Transaction[];
}
