import {
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  UseFilters,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { BusinessErrorFilter } from '../utils/businessError.filter';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favoritesService: FavouritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  @UseFilters(BusinessErrorFilter)
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Post('/artist/:id')
  @UseFilters(BusinessErrorFilter)
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Post('/album/:id')
  @UseFilters(BusinessErrorFilter)
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteArtist(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }
}
