import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({ example: 'Rick Astley', description: 'artist name' })
  @IsString()
  name: string;

  @ApiProperty({ example: true, description: 'does this artist hold grammy award' })
  @IsBoolean()
  grammy: boolean;
}
