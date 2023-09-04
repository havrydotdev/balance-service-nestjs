import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class SignUserDto {
  @ApiProperty({
    type: 'number',
    description: 'User id',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'User email',
    nullable: false,
    example: 'example@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'User name',
    nullable: false,
    example: 'Wade Allen',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
