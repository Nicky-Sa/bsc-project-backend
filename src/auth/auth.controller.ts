import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';
import { EnglishMessages } from '../../utils/englishTexts';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    return {
      data: await this.authService.signup(dto),
      message: EnglishMessages.successfulSignup,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return {
      data: await this.authService.login(dto),
      message: EnglishMessages.successfulLogin,
    };
  }
}
