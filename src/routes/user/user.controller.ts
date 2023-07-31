import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { BusinessErrorFilter } from '../../utils/businessError.filter';

@ApiTags('User endpoints')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create user',
    description: 'Create new user',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Get users',
    description: 'Get all users',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Get user',
    description: 'Get user by id',
  })
  @Get(':id')
  @UseFilters(BusinessErrorFilter)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: 'Change user',
    description: 'Change user with specified id',
  })
  @Put(':id')
  @UseFilters(BusinessErrorFilter)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, updatePasswordDto);
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Delte user with specified id',
  })
  @Delete(':id')
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
