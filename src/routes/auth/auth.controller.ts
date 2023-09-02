import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ISafeUser } from '../user/entities/safe-user.entity';
import { BusinessErrorFilter } from '../../utils/businessError.filter';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Public } from '../../utils/isPublic.metadata';

@Public()
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

  @Post('/refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh token' })
  @ApiForbiddenResponse({
    description: 'Token is invalid or expired',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  refresh(@Body() RefreshDto: RefreshDto) {
    return this.authService.refresh(RefreshDto);
  }
}
