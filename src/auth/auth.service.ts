import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users';
import { UsersService } from '../users/users.service';
import * as randtoken from 'rand-token';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  public async signUp(
    user: User
  ): Promise<any> {
    const foundUser = await this.usersService.findOne(user.username);
    if (!foundUser) {
      const {
        password,
        refreshToken,
        refreshTokenExpires,
        ...result
      } = await this.usersService.create(user.username, user.password);
      return Object.assign({
        message: `Accept: new user created`,
        data: result
      });
    } else {
      const p = foundUser.password;
      const blurredPassword = p[0] + '*'.repeat(p.length - 2) + p.slice(-1)
      return Object.assign({
        message: `Reject: existing username`,
        data: {
          username: user.username,
          password: blurredPassword
        }
      });
    }
  }

  public async validateUser(username: string, password: string): Promise<any> {
    const foundUser = await this.usersService.findOne(username);
    if (foundUser && foundUser.password === password) {
      const result = {
        id: foundUser.id,
        username: foundUser.username
      };
      return result;
    }
    return null;
  }

  public async signIn(id: number, username: string) {
    const payload = {
      username: username,
      sub: id
    }
    return {
      message: "Accept: keep these tokens in alive",
      data: {
        accessToken: this.jwtService.sign(payload),
        refreshToken: await this.genRefreshToken(payload.sub)
      }
    };
  }

  public async updateRefreshToken(id: number, username: string) {
    const payload = {
      username: username,
      sub: id
    }
    return {
      message: "Accept: keep these modified tokens",
      data: {
        accessToken: this.jwtService.sign(payload),
        refreshToken: await this.genRefreshToken(payload.sub)
      }
    };
  }

  private async genRefreshToken(userId: number): Promise<string | undefined> {
    const refreshToken = randtoken.generate(16);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 10);

    if (await this.usersService.updateRefreshToken(userId, refreshToken, expiryDate)) {
      return refreshToken;
    } else {
      return null;
    }
  }
}