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
import LoginUserDto from '../../../auth/dto/login-user.dto';
import { AuthService } from '../../../auth/services/auth/auth.service';
import SignUserDto from '../../../auth/dto/sign-user.dto';
import { Public } from '../../../auth/decorators/is-public.decorator';
import CreateUserDto from '../../../users/dto/create-user.dto';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import TokenResponse from '../../../auth/dto/token.dto';
import ErrorResponse from '../../../dto/error.dto';
import RegisterResp from '../../../auth/dto/register-resp.dto';

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
  async login(
    @Res() res: FastifyReply,
    @Body() reqBody: LoginUserDto,
  ): Promise<void> {
    const token = await this.authService.login(reqBody);

    res.send(token);
  }

  @ApiOkResponse({ type: () => RegisterResp, description: 'User registered' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  async register(
    @Res() res: FastifyReply,
    @Body() reqBody: CreateUserDto,
  ): Promise<void> {
    const userId = await this.authService.register(reqBody);

    res.send({
      user_id: userId,
    });
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
  getProfile(@Req() req: FastifyRequest): SignUserDto {
    return req.user;
  }
}
