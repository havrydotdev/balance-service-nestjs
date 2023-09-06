import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from '../../../constants.js';
import CreateUserDto from '../../..//users/dto/create-user.dto.js';
import { User } from '../../../users/entities/user.entity.js';

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

  async findById(userId: number): Promise<User> {
    const user = await this.usersRepo.findByPk(userId);
    user.password = null;
    return user;
  }

  async updateBalance(userId: number, value: number): Promise<number> {
    const rowsAffected = await this.usersRepo.increment('balance', {
      by: value,
      where: { id: userId },
    });

    return rowsAffected[1];
  }

  async create(user: CreateUserDto): Promise<number> {
    const createdUser = await this.usersRepo.create({
      ...user,
    });

    return createdUser.id;
  }
}
