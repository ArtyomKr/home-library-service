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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FavouritesService } from './favourites.service';
import { BusinessErrorFilter } from '../../utils/businessError.filter';

@ApiTags('Favourites endpoints')
@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @ApiOperation({
    summary: 'Get favourites',
    description: 'Get all favourites',
  })
  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }

  @ApiOperation({
    summary: 'Create favourite track',
    description: 'Create favourite track',
  })
  @Post('/track/:id')
  @UseFilters(BusinessErrorFilter)
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.addTrack(id);
  }

  @ApiOperation({
    summary: 'Create favourite artist',
    description: 'Create favourite artist',
  })
  @Post('/artist/:id')
  @UseFilters(BusinessErrorFilter)
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.addArtist(id);
  }

  @ApiOperation({
    summary: 'Create favourite album',
    description: 'Create favourite album',
  })
  @Post('/album/:id')
  @UseFilters(BusinessErrorFilter)
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.addAlbum(id);
  }

  @ApiOperation({
    summary: 'Delete track from favourites',
    description: 'Delete track from favourites',
  })
  @Delete('/track/:id')
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.deleteTrack(id);
  }

  @ApiOperation({
    summary: 'Delete artist from favourites',
    description: 'Delete artist from favourites',
  })
  @Delete('/artist/:id')
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.deleteArtist(id);
  }

  @ApiOperation({
    summary: 'Delete album from favourites',
    description: 'Delete album from favourites',
  })
  @Delete('/album/:id')
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.deleteAlbum(id);
  }
}
