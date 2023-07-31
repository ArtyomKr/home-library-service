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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { BusinessErrorFilter } from '../../utils/businessError.filter';

@ApiTags('Artist endpoints')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({
    summary: 'Create artist',
    description: 'Create new artist',
  })
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @ApiOperation({
    summary: 'Get artists',
    description: 'Get all artists',
  })
  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @ApiOperation({
    summary: 'Get artist',
    description: 'Get artist by id',
  })
  @Get(':id')
  @UseFilters(BusinessErrorFilter)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.findOne(id);
  }

  @ApiOperation({
    summary: 'Change artist',
    description: 'Change artist with specified id',
  })
  @Put(':id')
  @UseFilters(BusinessErrorFilter)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delte artist with specified id',
  })
  @Delete(':id')
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.remove(id);
  }
}
