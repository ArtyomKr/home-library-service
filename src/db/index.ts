import { User } from '../routes/user/entities/user.entity';
import { Track } from '../routes/track/entities/track.entity';
import { Artist } from '../routes/artist/entities/artist.entity';
import { Album } from '../routes/album/entities/album.entity';
import { Favourites } from '../routes/favourites/entities/favourites.entity';

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
