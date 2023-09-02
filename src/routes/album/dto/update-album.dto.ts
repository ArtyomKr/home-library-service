import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @ApiPropertyOptional({ example: 'Nevermind', description: 'album name' })
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  name?: string;

  @ApiPropertyOptional({ example: 1991, description: 'album year' })
  @IsNumber()
  @ValidateIf((object, value) => value !== undefined)
  year?: number;

  @ApiPropertyOptional({
    example: 'b3a0f0e0-d1c4-452e-89c1-2a99a463f9eb',
    description: 'UUID of the artist',
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
