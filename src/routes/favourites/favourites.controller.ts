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
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { FavouritesService } from './favourites.service';
import { BusinessErrorFilter } from '../../utils/businessError.filter';
import { Favourites } from './entities/favourites.entity';

@ApiTags('Favourites endpoints')
@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get favourites',
    description: 'Get all favourites',
  })
  @ApiOkResponse({
    description: 'The records have been successfully found',
    type: Favourites,
  })
  findAll() {
    return this.favouritesService.findAll();
  }

  @Post('/track/:id')
  @ApiOperation({
    summary: 'Create favourite track',
    description: 'Create favourite track',
  })
  @UseFilters(BusinessErrorFilter)
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
  })
  @ApiUnprocessableEntityResponse({ description: 'Track not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.addTrack(id);
  }

  @Post('/artist/:id')
  @ApiOperation({
    summary: 'Create favourite artist',
    description: 'Create favourite artist',
  })
  @UseFilters(BusinessErrorFilter)
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
  })
  @ApiUnprocessableEntityResponse({ description: 'Artist not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.addArtist(id);
  }

  @Post('/album/:id')
  @ApiOperation({
    summary: 'Create favourite album',
    description: 'Create favourite album',
  })
  @UseFilters(BusinessErrorFilter)
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
  })
  @ApiUnprocessableEntityResponse({ description: 'Album not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.addAlbum(id);
  }

  @Delete('/track/:id')
  @ApiOperation({
    summary: 'Delete track from favourites',
    description: 'Delete track from favourites',
  })
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  @ApiNoContentResponse({ description: 'Record was deleted' })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.deleteTrack(id);
  }

  @Delete('/artist/:id')
  @ApiOperation({
    summary: 'Delete artist from favourites',
    description: 'Delete artist from favourites',
  })
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  @ApiNoContentResponse({ description: 'Record was deleted' })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.deleteArtist(id);
  }

  @Delete('/album/:id')
  @ApiOperation({
    summary: 'Delete album from favourites',
    description: 'Delete album from favourites',
  })
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  @ApiNoContentResponse({ description: 'Record was deleted' })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favouritesService.deleteAlbum(id);
  }
}
