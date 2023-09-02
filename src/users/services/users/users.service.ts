import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
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

  async updateBalance(userId: number, value: number): Promise<number> {
    const rowsAffected = await this.usersRepo.update(
      {
        balance: sequelize.literal(`balance + ${value}`),
      },
      {
        where: { id: userId },
      },
    );

    return rowsAffected.at(0);
  }

  async create(user: CreateUserDto): Promise<number> {
    const createdUser = await this.usersRepo.create({
      ...user,
    });

    return createdUser.id;
  }
}
