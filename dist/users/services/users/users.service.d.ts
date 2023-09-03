import CreateUserDto from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
export declare class UsersService {
    private readonly usersRepo;
    constructor(usersRepo: typeof User);
    findOne(email: string): Promise<User>;
    findById(userId: number): Promise<User>;
    updateBalance(userId: number, value: number): Promise<number>;
    create(user: CreateUserDto): Promise<number>;
}
