import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@Unique(['artistId', 'userId'])
export class FavArtists {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artistId: string | null;

  @ApiHideProperty()
  @Column({ nullable: true })
  userId: string | null;

  @ApiHideProperty()
  @ManyToOne(() => Artist, { onDelete: 'CASCADE', eager: true })
  artist: Artist;

  @ApiHideProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}

@Entity()
@Unique(['albumId', 'userId'])
export class FavAlbums {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  albumId: string | null;

  @ApiHideProperty()
  @Column({ nullable: true })
  userId: string | null;

  @ApiHideProperty()
  @ManyToOne(() => Album, { onDelete: 'CASCADE', eager: true })
  album: Album;

  @ApiHideProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}

@Entity()
@Unique(['trackId', 'userId'])
export class FavTracks {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trackId: string | null;

  @ApiHideProperty()
  @Column({ nullable: true })
  userId: string | null;

  @ApiHideProperty()
  @ManyToOne(() => Track, { onDelete: 'CASCADE', eager: true })
  track: Track;

  @ApiHideProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}

export class Favourites {
  albums: Album[];
  tracks: Track[];
  artists: Artist[];
}
