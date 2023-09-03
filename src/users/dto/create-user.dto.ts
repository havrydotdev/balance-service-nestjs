import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserDto {
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

  @ApiProperty({
    required: true,
    type: 'string',
    title: 'email',
    description: 'User`s password',
    example: 'example@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
    type: 'string',
    title: 'name',
    description: 'User`s name',
    example: 'Wade Allen',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
