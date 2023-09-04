import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local/local.strategy';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { jwtSecret } from '../constants';
import { UsersService } from '../users/services/users/users.service';
import { usersRepository } from '../users/repository/users.repository';

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
