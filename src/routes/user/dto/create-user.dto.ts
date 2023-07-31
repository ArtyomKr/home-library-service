import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'LoginExample', description: 'user login' })
  @IsString()
  login: string;

  @ApiProperty({ example: 'pass12345', description: 'user password' })
  @IsString()
  password: string;
}
