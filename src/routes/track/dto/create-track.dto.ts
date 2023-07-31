import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    example: 'Never Gonna Give You Up',
    description: 'track title',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'b2a0f0e0-d1c4-452e-85c1-2a99a463f4eb',
    description: 'UUID of the artist',
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @ApiPropertyOptional({
    example: 'b2a0f0e0-d1c4-452e-85c1-2a99a463f4eb',
    description: 'UUID of the album',
  })
  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @ApiProperty({ example: 180, description: 'track duration' })
  @IsInt()
  duration: number;
}
