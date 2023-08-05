import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { BusinessError } from '../../utils/businessError';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create({ name, grammy }: CreateArtistDto): Promise<Artist> {
    const artist = await this.artistRepository.create({
      name,
      grammy,
    });
    await this.artistRepository.insert(artist);
    return artist;
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new BusinessError('Artist not found', 404);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new BusinessError('Artist not found', 404);
    return await this.artistRepository.save(
      Object.assign(artist, updateArtistDto),
    );
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new BusinessError('Artist not found', 404);
    await this.artistRepository.remove(artist);
  }
}
