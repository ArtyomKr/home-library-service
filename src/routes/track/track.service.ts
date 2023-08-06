import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { BusinessError } from '../../utils/businessError';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create({
    name,
    duration,
    artistId,
    albumId,
  }: CreateTrackDto): Promise<Track> {
    const track = await this.trackRepository.create({
      name,
      duration,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
    });
    await this.trackRepository.insert(track);
    return track;
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new BusinessError('Track not found', 404);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new BusinessError('Track not found', 404);
    return await this.trackRepository.save(
      Object.assign(track, updateTrackDto),
    );
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new BusinessError('Track not found', 404);
    await this.trackRepository.remove(track);
  }
}
