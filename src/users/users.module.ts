import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service.js';
import { usersRepository } from './repository/users.repository.js';

@Module({
  providers: [UsersService, usersRepository],
  exports: [UsersService],
})
export class UsersModule {}
