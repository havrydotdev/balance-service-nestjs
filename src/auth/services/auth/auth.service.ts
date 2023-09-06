import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import LoginUserDto from '../../../auth/dto/login-user.dto.js';
import { UsersService } from '../../../users/services/users/users.service.js';
import { comparePasswords, encodePassword } from '../../../utils/bcrypt.js';
import CreateUserDto from '../../../users/dto/create-user.dto.js';
import SignUserDto from '../../../auth/dto/sign-user.dto.js';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { encodeJwt } = require('../../../../index.node');

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private usersService: UsersService) {}

  async validateUser({
    email,
    password,
  }: LoginUserDto): Promise<SignUserDto | null> {
    const user = await this.usersService.findOne(email);
    if (user && comparePasswords(password, user.password)) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }

    return null;
  }

  async login(loginDto: LoginUserDto) {
    const signPayload = await this.validateUser({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (!signPayload) {
      this.logger.error(`Invalid credentials for user ${loginDto.email}`);
      throw new UnauthorizedException({
        message: 'Incorrect credentials',
      });
    }

    return {
      access_token: encodeJwt({
        id: signPayload.id,
        email: signPayload.email,
        name: signPayload.name,
      }),
    };
  }

  async register(regDto: CreateUserDto): Promise<number> {
    regDto.password = encodePassword(regDto.password);
    const user = await this.usersService.findOne(regDto.email);
    if (user) {
      this.logger.error(`User with email ${regDto.email} does already exist`);
      throw new BadRequestException({
        message: 'User with this email does already exist',
      });
    }

    return this.usersService.create(regDto);
  }
}
