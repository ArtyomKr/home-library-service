import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { BusinessError } from '../../utils/businessError';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create({ name, year, artistId }: CreateAlbumDto): Promise<Album> {
    const album = await this.albumRepository.create({
      name,
      year,
      artistId: artistId ?? null,
    });
    await this.albumRepository.insert(album);
    return album;
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album = this.albumRepository.findOne({ where: { id } });
    if (!album) throw new BusinessError('Album not found', 404);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new BusinessError('Album not found', 404);
    return await this.albumRepository.save(
      Object.assign(album, updateAlbumDto),
    );
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new BusinessError('Album not found', 404);
    await this.albumRepository.remove(album);
  }
}
