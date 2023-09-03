import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import LoginUserDto from 'src/auth/dto/login-user.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
import SignUserDto from 'src/auth/dto/sign-user.dto';
import { Public } from 'src/auth/decorators/is-public.decorator';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import TokenResponse from 'src/auth/dto/token.dto';
import ErrorResponse from 'src/dto/error.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: () => TokenResponse, description: 'User created' })
  @ApiInternalServerErrorResponse({
    type: () => ErrorResponse,
    description: '',
  })
  async login(
    @Res() res: FastifyReply,
    @Body() reqBody: LoginUserDto,
  ): Promise<void> {
    const token = await this.authService.login(reqBody);

    res.send(token);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User created' })
  async register(
    @Res() res: FastifyReply,
    @Body() reqBody: CreateUserDto,
  ): Promise<void> {
    const userId = await this.authService.register(reqBody);

    res.send({
      user_id: userId,
    });
  }

  @Get('profile')
  getProfile(@Req() req: FastifyRequest): SignUserDto {
    return req.user;
  }
}
