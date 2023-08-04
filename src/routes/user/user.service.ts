import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { BusinessError } from '../../utils/businessError';
import { ISafeUser } from './entities/safe-user.entity';
import { generateHash } from '../../utils/generateHash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ login, password: pass }: CreateUserDto): Promise<ISafeUser> {
    const user = await this.usersRepository.create({
      login,
      password: await generateHash(pass),
      version: 1,
    });

    const result = await this.usersRepository.save(user);
    const safeUser = Object.assign({}, result);
    delete safeUser.password;
    return safeUser;
  }

  async findAll(): Promise<ISafeUser[]> {
    return await this.usersRepository.find({
      select: ['id', 'login', 'version', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(id: string): Promise<ISafeUser> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new BusinessError('User not found', 404);

    const safeUser = Object.assign({}, user);
    delete safeUser.password;
    return safeUser;
  }

  async update(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<ISafeUser> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new BusinessError('User not found', 404);
    if (!(await compare(oldPassword, user.password)))
      throw new BusinessError('Password is incorrect', 403);

    user.password = await generateHash(newPassword);
    user.version++;
    await this.usersRepository.save(user);

    const safeUser = Object.assign({}, user);
    delete safeUser.password;
    return safeUser;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new BusinessError('User not found', 404);
    await this.usersRepository.remove(user);
  }
}
