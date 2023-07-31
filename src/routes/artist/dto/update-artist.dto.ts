import { IsBoolean, IsString, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateArtistDto {
  @ApiPropertyOptional({ example: 'Kurt Cobain', description: 'artist name' })
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  name?: string;

  @ApiPropertyOptional({ example: true, description: 'does this artist hold grammy award' })
  @IsBoolean()
  @ValidateIf((object, value) => value !== undefined)
  grammy?: boolean;
}
