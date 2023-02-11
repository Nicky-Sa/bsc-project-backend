import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // 'jwt' is a key to reference this strategy in @UseGuards(AuthGuard('jwt')) -> if you leave it blank it's jwt by default
  constructor(private configService: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return await this.userService.findOne(payload.sub);
  }

  private static extractJWTFromCookie(req: Request): string | null {
    console.log(req.cookies);
    if (req.cookies && 'accessToken' in req.cookies && req.cookies.accessToken.length > 0) {
      return req.cookies.accessToken;
    }
    return null;
  }
}
