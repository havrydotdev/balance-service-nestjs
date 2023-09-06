import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local/local.strategy.js';
import { AuthController } from './controllers/auth/auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt/jwt.strategy.js';
import { ConfigModule } from '@nestjs/config';
import { jwtSecret } from '../constants.js';
import { UsersService } from '../users/services/users/users.service.js';
import { usersRepository } from '../users/repository/users.repository.js';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
    PassportModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    usersRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
