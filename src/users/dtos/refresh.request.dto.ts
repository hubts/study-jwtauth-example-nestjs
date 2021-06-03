import { IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshRequestDto {
  @ApiProperty({example:`string`, description:`Access token`})
  @IsString()
  accessToken: string;

  @ApiProperty({example:`string`, description:`Refresh token`})
  @IsString()
  refreshToken: string;
}