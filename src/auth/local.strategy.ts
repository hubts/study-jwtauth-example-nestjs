import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<any> {
    const validatedUser = await this.authService.validateUser(username, password);
    if (!validatedUser) {
      throw new UnauthorizedException();
    }
    return validatedUser;
  }
}