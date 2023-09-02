import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { FavAlbums, FavArtists, FavTracks } from './entities/favourites.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavArtists,
      FavAlbums,
      FavTracks,
      Artist,
      Album,
      Track,
    ]),
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
