import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { UserService } from '../user/user.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ISafeUser } from '../user/entities/safe-user.entity';

@ApiTags('Auth endpoints')
@Controller('auth')
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
}
