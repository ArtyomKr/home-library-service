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
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { BusinessErrorFilter } from '../../utils/businessError.filter';
import { Track } from './entities/track.entity';

@ApiTags('Track endpoints')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({
    summary: 'Create track',
    description: 'Create new track',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get tracks',
    description: 'Get all tracks',
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get track',
    description: 'Get track by id',
  })
  @UseFilters(BusinessErrorFilter)
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Change track',
    description: 'Change track with specified id',
  })
  @UseFilters(BusinessErrorFilter)
  @ApiOkResponse({
    description: 'The record has been successfully updated',
    type: Track,
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track with specified id',
  })
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  @ApiNoContentResponse({ description: 'Record was deleted' })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.remove(id);
  }
}
