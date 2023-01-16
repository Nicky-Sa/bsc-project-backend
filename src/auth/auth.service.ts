import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto, SignUpDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PartialUser, User } from '../user/entities';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnglishErrors } from '../../utils/englishTexts';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: SignUpDto) {
    await this.userService.create(dto as User);
    return await this.generateToken({ username: dto.username });
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findOne({ username: dto.username });
    const passwordCorrect = await bcrypt.compare(dto.password, user.password);
    if (passwordCorrect) {
      return await this.generateToken({ username: dto.username });
    } else {
      throw new ForbiddenException(EnglishErrors.wrongPassword);
    }
  }

  private async generateToken({ username }: PartialUser) {
    const payload = {
      sub: username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('JWT_EXPIRATION'),
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }
}
