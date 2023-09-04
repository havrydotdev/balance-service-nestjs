import { ApiProperty } from '@nestjs/swagger';

export default class RegisterResp {
  @ApiProperty({
    type: 'number',
    nullable: false,
    description: 'Created user id',
    example: 1,
  })
  user_id: number;
}
