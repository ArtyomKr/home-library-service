import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FavAlbums,
  FavArtists,
  Favourites,
  FavTracks,
} from './entities/favourites.entity';
import { BusinessError } from '../../utils/businessError';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(FavArtists)
    private favArtistsRepository: Repository<FavArtists>,
    @InjectRepository(FavAlbums)
    private favAlbumsRepository: Repository<FavAlbums>,
    @InjectRepository(FavTracks)
    private favTracksRepository: Repository<FavTracks>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async findAll(): Promise<Favourites> {
    const artists = await this.favArtistsRepository.find();
    const tracks = await this.favTracksRepository.find();
    const albums = await this.favAlbumsRepository.find();

    return {
      artists: artists.map(({ artist }) => artist),
      tracks: tracks.map(({ track }) => track),
      albums: albums.map(({ album }) => album),
    };
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new BusinessError('Track not found', 422);
    const favTrack = await this.favTracksRepository.create({ trackId: id });
    await this.favTracksRepository.insert(favTrack);
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new BusinessError('Artist not found', 422);
    const favArtist = await this.favArtistsRepository.create({ artistId: id });
    await this.favArtistsRepository.insert(favArtist);
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new BusinessError('Album not found', 422);
    const favAlbum = await this.favAlbumsRepository.create({ albumId: id });
    await this.favAlbumsRepository.insert(favAlbum);
  }

  async deleteTrack(id: string) {
    const track = await this.favTracksRepository.findOne({
      where: { trackId: id },
    });
    if (!track) throw new BusinessError('Track is not favourite', 404);
    await this.favTracksRepository.remove(track);
  }

  async deleteArtist(id: string) {
    const artist = await this.favArtistsRepository.findOne({
      where: { artistId: id },
    });
    if (!artist) throw new BusinessError('Artist is not favourite', 404);
    await this.favArtistsRepository.remove(artist);
  }

  async deleteAlbum(id: string) {
    const album = await this.favAlbumsRepository.findOne({
      where: { albumId: id },
    });
    if (!album) throw new BusinessError('Album is not favourite', 404);
    await this.favAlbumsRepository.remove(album);
  }
}
