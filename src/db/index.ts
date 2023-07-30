import { User } from '../user/entities/user.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Favourites } from '../favourites/entities/favourites.entity';

interface IDB {
  users: User[];
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  favourites: Favourites;
}

const db: IDB = {
  users: [],
  tracks: [],
  artists: [],
  albums: [],
  favourites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

export const getDB = () => db;
