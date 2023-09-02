import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routes/user/user.module';
import { TrackModule } from './routes/track/track.module';
import { ArtistModule } from './routes/artist/artist.module';
import { AlbumModule } from './routes/album/album.module';
import { FavouritesModule } from './routes/favourites/favourites.module';
import { connectionOptions } from './typeorm.config';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { GlobalFilter } from './utils/global.filter';
import { AuthModule } from './routes/auth/auth.module';
import { AuthGuard } from './routes/auth/auth.guard';

@Module({
  imports: [
    LoggerModule,
    AuthModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavouritesModule,
    TypeOrmModule.forRoot(connectionOptions),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
