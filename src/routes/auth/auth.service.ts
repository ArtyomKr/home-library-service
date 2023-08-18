import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { BusinessError } from '../../utils/businessError';
import { compare } from 'bcrypt';
import { generateAccessToken } from '../../utils/generateToken';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login({ login, password }: LoginDto): Promise<TokenDto> {
    const user = await this.usersRepository.findOne({ where: { login } });
    if (!user || !(await compare(password, user.password)))
      throw new BusinessError(
        'Password is incorrect or user does not exist',
        403,
      );
    return { token: generateAccessToken(user.id, login) };
  }
}
