import { Controller, Request, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/users';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersResponseDto } from './dtos/users.response.dto';
import { RefreshRequestDto } from './dtos/refresh.request.dto';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  @ApiOperation({summary: 'New user creation'})
  @ApiResponse({status: 201, description: 'Accept', type: UsersResponseDto})
  public async signUp(@Body() user: User): Promise<UsersResponseDto> { // No guard = @Body
    return await this.authService.signUp(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  @ApiOperation({summary: 'User sign in'})
  @ApiResponse({status: 201, description: 'Accept', type: UsersResponseDto})
  public async signIn(@Request() req: any, @Body() user: User) {
    return await this.authService.signIn(req.user.id, req.user.username);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard('jwt'))
  @Post('check')
  @ApiOperation({summary: `Check authorization`})
  @ApiResponse({status: 201, description: `Authorization`, type: UsersResponseDto})
  public checkAuthorized() {
    return {
      message: `You are authorized!`,
      data: null
    };
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @ApiOperation({summary: `Refresh the token`})
  @ApiResponse({status: 201, description: `Refresh token`, type: UsersResponseDto})
  public async refreshToken(@Request() req: any, @Body() refreshRequestDto: RefreshRequestDto) {
    return await this.authService.updateRefreshToken(req.user.id, req.user.username);
  }
}