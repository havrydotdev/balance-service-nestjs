import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class LoginUserDto {
  @ApiProperty({
    required: true,
    type: 'string',
    title: 'password',
    description: 'Raw user password',
    example: 'secret_pass',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @ApiProperty({
    required: true,
    type: 'string',
    title: 'email',
    description: 'User`s email',
    example: 'example@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
