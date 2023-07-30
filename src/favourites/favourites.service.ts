import { Injectable } from '@nestjs/common';
import { Favourites } from './entities/favourites.entity';
import { getDB } from '../db';
import { BusinessError } from '../utils/businessError';

@Injectable()
export class FavouritesService {
  private readonly favourites: Favourites = getDB().favourites;

  findAll() {
    const artists = this.favourites.artists.map((id) =>
      getDB().artists.find((artist) => artist.id === id),
    );
    const albums = this.favourites.albums.map((id) =>
      getDB().albums.find((albums) => albums.id === id),
    );
    const tracks = this.favourites.tracks.map((id) =>
      getDB().tracks.find((track) => track.id === id),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrack(id: string) {
    const track = getDB().tracks.find((track) => track.id === id);
    if (!track) throw new BusinessError('Track not found', 422);
    this.favourites.tracks.push(id);
  }

  addArtist(id: string) {
    const artist = getDB().artists.find((artist) => artist.id === id);
    if (!artist) throw new BusinessError('Artist not found', 422);
    this.favourites.artists.push(id);
  }

  addAlbum(id: string) {
    const album = getDB().albums.find((album) => album.id === id);
    if (!album) throw new BusinessError('Album not found', 422);
    this.favourites.albums.push(id);
  }

  deleteTrack(id: string) {
    const index = this.favourites.tracks.indexOf(id);
    if (index === -1) throw new BusinessError('Track is not favourite', 404);
    this.favourites.tracks.splice(index, 1);
  }

  deleteArtist(id: string) {
    const index = this.favourites.artists.indexOf(id);
    if (index === -1) throw new BusinessError('Artist is not favourite', 404);
    this.favourites.artists.splice(index, 1);
  }

  deleteAlbum(id: string) {
    const index = this.favourites.albums.indexOf(id);
    if (index === -1) throw new BusinessError('Album is not favourite', 404);
    this.favourites.albums.splice(index, 1);
  }
}
