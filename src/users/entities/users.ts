import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  @ApiProperty({example:`john`, description:`Username`})
  username: string;

  @Column()
  @IsString()
  @ApiProperty({example:`pass1234`, description:`Password`})
  password: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ nullable: true })
  refreshTokenExpires?: string;
}