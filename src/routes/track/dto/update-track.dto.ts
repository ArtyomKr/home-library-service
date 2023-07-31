import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiProperty({ example: 'Take Me to Your Heart', description: 'Track title' })
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  name: string;

  @ApiPropertyOptional({ example: 'b2a0f0e0-d1c4-452e-85c1-2a99a463f4eb', description: 'UUID of the artist' })
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @ApiPropertyOptional({ example: 'b2a0f0e0-d1c4-452e-85c1-2a99a463f4eb', description: 'UUID of the album' })
  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @ApiProperty({ example: 190, description: 'track duration' })
  @IsInt()
  @ValidateIf((object, value) => value !== undefined)
  duration: number;
}
