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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { BusinessErrorFilter } from '../../utils/businessError.filter';

@ApiTags('Album endpoints')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({
    summary: 'Create album',
    description: 'Create new album',
  })
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @ApiOperation({
    summary: 'Get albums',
    description: 'Get all albums',
  })
  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @ApiOperation({
    summary: 'Get album',
    description: 'Get album by id',
  })
  @Get(':id')
  @UseFilters(BusinessErrorFilter)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findOne(id);
  }

  @ApiOperation({
    summary: 'Change album',
    description: 'Change album with specified id',
  })
  @Put(':id')
  @UseFilters(BusinessErrorFilter)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @ApiOperation({
    summary: 'Delete album',
    description: 'Delte album with specified id',
  })
  @Delete(':id')
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
