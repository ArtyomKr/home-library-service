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
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { BusinessErrorFilter } from '../../utils/businessError.filter';
import { SafeUser } from './entities/safe-user.entity';

@ApiTags('User endpoints')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Create new user',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
    type: SafeUser,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get users',
    description: 'Get all users',
  })
  @ApiOkResponse({
    description: 'The records have been successfully found',
    type: [SafeUser],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user',
    description: 'Get user by id',
  })
  @UseFilters(BusinessErrorFilter)
  @ApiOkResponse({
    description: 'The record has been successfully found',
    type: SafeUser,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Change user',
    description: 'Change user with specified id',
  })
  @UseFilters(BusinessErrorFilter)
  @ApiOkResponse({
    description: 'The record has been successfully updated',
    type: SafeUser,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Old password is incorrect' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user with specified id',
  })
  @HttpCode(204)
  @UseFilters(BusinessErrorFilter)
  @ApiNoContentResponse({ description: 'Record was deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
