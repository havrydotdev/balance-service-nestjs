import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import LoginUserDto from '../../../auth/dto/login-user.dto.js';
import { AuthService } from '../../../auth/services/auth/auth.service.js';
import SignUserDto from '../../../auth/dto/sign-user.dto.js';
import { Public } from '../../../auth/decorators/is-public.decorator.js';
import CreateUserDto from '../../../users/dto/create-user.dto.js';
import { FastifyRequest } from 'fastify';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import TokenResponse from '../../../auth/dto/token.dto.js';
import ErrorResponse from '../../../dto/error.dto.js';
import RegisterResp from '../../../auth/dto/register-resp.dto.js';
import { CustomUser } from 'types/fastify.js';

@ApiTags('auth')
@Controller('auth')
@ApiInternalServerErrorResponse({
  type: () => ErrorResponse,
  description: 'Something went wrong',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: () => TokenResponse, description: 'User created' })
  @ApiUnauthorizedResponse({
    type: () => ErrorResponse,
    description: 'Incorrect user`s credentials',
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() reqBody: LoginUserDto): Promise<TokenResponse> {
    const token = await this.authService.login(reqBody);

    return token;
  }

  @ApiOkResponse({ type: () => RegisterResp, description: 'User registered' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  async register(@Body() reqBody: CreateUserDto): Promise<RegisterResp> {
    const userId = await this.authService.register(reqBody);

    return {
      user_id: userId,
    };
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token from login endpoint',
  })
  @ApiOkResponse({ type: () => SignUserDto, description: 'User exist' })
  @ApiUnauthorizedResponse({
    type: () => ErrorResponse,
    description: 'User isn`t authorized',
  })
  @Get('profile')
  getProfile(@Req() req: FastifyRequest): CustomUser {
    return req.user;
  }
}
