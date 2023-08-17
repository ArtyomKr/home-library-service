import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { BusinessError } from '../../utils/businessError';
import { compare } from 'bcrypt';
import generateToken from '../../utils/generateToken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login({ login, password }: LoginDto) {
    const user = await this.usersRepository.findOne({ where: { login } });
    if (!user) throw new BusinessError('User not found', 404);
    if (!(await compare(password, user.password)))
      throw new BusinessError('Password is incorrect', 403);
    return generateToken(user.id, login);
  }
}
