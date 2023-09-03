import { Model } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
export default class Transaction extends Model {
    id: number;
    desc: string;
    value: number;
    type: TransactionType;
    userId: number;
    user: User;
}
