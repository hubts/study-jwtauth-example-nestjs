import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtRefreshTokenStartegy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: true,
      secretOrKey: 'My secret Never let outsiders',
      passReqToCallback: true,
    });
  }

  public async validate(req: any, payload: any) {
    const user = await this.userService.findOne(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (req.body.refreshToken !== user.refreshToken) {
      throw new UnauthorizedException();
    }
    if (new Date() > new Date(user.refreshTokenExpires)) {
      throw new UnauthorizedException();
    }
    return { id: payload.sub, username: payload.username };
  }
}
