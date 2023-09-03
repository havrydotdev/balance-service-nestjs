import { ApiProperty } from '@nestjs/swagger';

export default class TokenResponse {
  @ApiProperty({
    type: 'string',
    nullable: false,
  })
  access_token: string;
}
