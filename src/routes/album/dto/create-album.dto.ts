import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Whenever You Need Somebody', description: 'album name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1987, description: 'album year' })
  @IsNumber()
  year: number;

  @ApiPropertyOptional({ example: 'b2a0f0e0-d1c4-452e-85c1-2a99a463f4eb', description: 'UUID of the artist' })
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
