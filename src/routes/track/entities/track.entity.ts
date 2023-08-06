import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @ApiHideProperty()
  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  artist: Artist;

  @ApiHideProperty()
  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  album: Album;
}
