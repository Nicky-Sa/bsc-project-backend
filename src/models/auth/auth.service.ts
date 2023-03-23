import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '@/models/user/user.service';
import { LoginDto, SignUpDto } from 'models/auth/dto';
import * as bcrypt from 'bcrypt';
import { User } from '@/models/user/entities';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PersianErrors } from '@/utils/persianTexts.enum';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService) {}

  async signup(dto: SignUpDto) {
    await this.userService.create(dto as User);
    return await this.generateToken(dto.username);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findOne(dto.username);
    const passwordCorrect = await bcrypt.compare(dto.password, user.password);
    if (passwordCorrect) {
      return await this.generateToken(dto.username);
    } else {
      throw new ForbiddenException(PersianErrors.wrongInfo);
    }
  }

  private async generateToken(username: User['username']) {
    const payload = {
      sub: username,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('JWT_EXPIRATION'),
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }
}
