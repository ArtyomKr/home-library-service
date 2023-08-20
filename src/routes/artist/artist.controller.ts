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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { BusinessErrorFilter } from '../../utils/businessError.filter';

@Controller('artist')
@UseFilters(BusinessErrorFilter)
@ApiTags('Artist endpoints')
@ApiBearerAuth('access-token')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({
    summary: 'Create artist',
    description: 'Create new artist',
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get artists',
    description: 'Get all artists',
  })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get artist',
    description: 'Get artist by id',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Change artist',
    description: 'Change artist with specified id',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist with specified id',
  })
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Record was deleted' })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.remove(id);
  }
}
