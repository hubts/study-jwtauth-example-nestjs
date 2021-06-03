import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/users';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0623',
      database: 'database',
      synchronize: true,
      entities: [
        User
      ],
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [
    UsersController
  ]
})
export class AppModule { }