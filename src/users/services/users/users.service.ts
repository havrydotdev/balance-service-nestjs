import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/constants';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly usersRepo: typeof User,
  ) {}

  async findOne(email: string): Promise<User> {
    return this.usersRepo.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(user: CreateUserDto): Promise<number> {
    const createdUser = await this.usersRepo.create({
      ...user,
      balance: 0,
    });

    return createdUser.id;
  }
}
