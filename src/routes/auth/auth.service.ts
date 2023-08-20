import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { BusinessError } from '../../utils/businessError';
import { compare } from 'bcrypt';
import { TokenDto } from './dto/token.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtService } from '@nestjs/jwt';
import { refreshSecret, refreshTokenExpiration } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login({ login, password }: LoginDto): Promise<TokenDto> {
    const user = await this.usersRepository.findOne({ where: { login } });
    if (!user || !(await compare(password, user.password)))
      throw new BusinessError(
        'Password is incorrect or user does not exist',
        403,
      );
    return {
      accessToken: await this.jwtService.signAsync({ userId: user.id, login }),
      refreshToken: await this.jwtService.signAsync(
        { userId: user.id, login },
        { secret: refreshSecret, expiresIn: refreshTokenExpiration },
      ),
    };
  }

  async refresh({ refreshToken }: RefreshDto): Promise<TokenDto> {
    if (!refreshToken) throw new BusinessError('Unauthorized', 401);
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: refreshSecret,
      });
      return {
        accessToken: await this.jwtService.signAsync({
          userId: decoded.userId,
          login: decoded.login,
        }),
        refreshToken: await this.jwtService.signAsync(
          {
            userId: decoded.userId,
            login: decoded.login,
          },
          { secret: refreshSecret, expiresIn: refreshTokenExpiration },
        ),
      };
    } catch {
      throw new BusinessError('Token is invalid or expired', 403);
    }
  }
}
