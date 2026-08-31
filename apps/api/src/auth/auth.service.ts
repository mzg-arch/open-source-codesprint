import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, username, password } = registerDto;

    const existingEmail =
      await this.usersService.findByEmail(email);

    if (existingEmail) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const existingUsername =
      await this.usersService.findByUsername(username);

    if (existingUsername) {
      throw new BadRequestException(
        'Username already exists',
      );
    }

    const passwordHash =
      await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      email,
      username,
      passwordHash,
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    };
  }
}