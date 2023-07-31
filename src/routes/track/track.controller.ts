import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseFilters,
  Put,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { BusinessErrorFilter } from '../../utils/businessError.filter';

@ApiTags('Track endpoints')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({
    summary: 'Create track',
    description: 'Create new track',
  })
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @ApiOperation({
    summary: 'Get all tracks',
    description: 'Get all tracks',
  })
  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @ApiOperation({
    summary: 'Get track',
    description: 'Get track by id',
  })
  @Get(':id')
  @UseFilters(BusinessErrorFilter)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.findOne(id);
  }

  @ApiOperation({
    summary: 'Change track',
    description: 'Change track with specified id',
  })
  @Put(':id')
  @UseFilters(BusinessErrorFilter)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @ApiOperation({
    summary: 'Delete track',
    description: 'Delte track with specified id',
  })
  @Delete(':id')
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.remove(id);
  }
}
