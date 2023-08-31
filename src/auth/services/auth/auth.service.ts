import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginUserDto from 'src/auth/dto/login-user.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import CreateUserDto from 'src/users/dto/create-user.dto';
import SignUserDto from 'src/auth/dto/sign-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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
      throw new UnauthorizedException({
        message: 'Incorrect credentials',
      });
    }

    return {
      access_token: this.jwtService.sign({
        id: signPayload.id,
        email: signPayload.email,
        name: signPayload.name,
      }),
    };
  }

  async register(regDto: CreateUserDto): Promise<number> {
    regDto.password = encodePassword(regDto.password);
    return this.usersService.create(regDto);
  }
}
