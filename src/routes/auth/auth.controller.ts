import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ISafeUser } from '../user/entities/safe-user.entity';
import { BusinessErrorFilter } from '../../utils/businessError.filter';

@ApiTags('Auth endpoints')
@Controller('auth')
@UseFilters(BusinessErrorFilter)
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
    type: ISafeUser,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  create(@Body() LoginDto: LoginDto) {
    return this.userService.create(LoginDto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  @ApiForbiddenResponse({
    description: 'Password is incorrect or user does not exist',
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }
}
