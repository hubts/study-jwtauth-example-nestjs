import { IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsersResponseDto {
  @ApiProperty({example:`Accept | Reject: description`, description:`Response message`})
  @IsString()
  message: string;

  @ApiProperty({example:`{}`, description:`Response data`})
  @IsObject()
  data: Object;
}