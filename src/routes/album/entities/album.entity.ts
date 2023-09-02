import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ApiHideProperty()
  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  artist: Artist;
}
