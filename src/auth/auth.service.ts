import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
      const salt = await bcrypt.genSalt();
      dto.password = await bcrypt.hash(dto.password, salt);
      const user = await this.prisma.users.create({ data: dto });
      console.log(user);
      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  login() {
    return 'login';
  }
}
