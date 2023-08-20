import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseFilters,
  HttpCode,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { BusinessErrorFilter } from '../../utils/businessError.filter';

@Controller('album')
@UseFilters(BusinessErrorFilter)
@ApiTags('Album endpoints')
@ApiBearerAuth('access-token')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({
    summary: 'Create album',
    description: 'Create new album',
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get albums',
    description: 'Get all albums',
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get album',
    description: 'Get album by id',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Change album',
    description: 'Change album with specified id',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album with specified id',
  })
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Record was deleted' })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
