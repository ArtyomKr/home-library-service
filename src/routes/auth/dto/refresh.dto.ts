import { PartialType } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class RefreshDto extends PartialType(LoginDto) {}
