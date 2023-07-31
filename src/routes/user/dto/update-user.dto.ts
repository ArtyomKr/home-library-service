import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'pass12345', description: 'old user password' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'newPass123', description: 'new user password' })
  @IsString()
  newPassword: string;
}
