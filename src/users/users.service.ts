import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) { }

  public async findOne(username: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ username });
  }

  public async create(username: string, password: string): Promise<User | undefined> {
    return await this.userRepo.save({ username, password });
  }

  public async updateRefreshToken(
    id: number,
    refreshToken: string,
    refreshTokenExpires: Date
  ) {
    return await this.userRepo.update(
      id,
      {
        refreshToken: refreshToken,
        refreshTokenExpires: refreshTokenExpires.toString()
      })
  }
}