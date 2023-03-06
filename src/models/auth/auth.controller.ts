import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from 'models/auth/auth.service';
import { LoginDto, SignUpDto } from 'models/auth/dto';
import { PersianMessages } from '@/utils/persianTexts';
import { Response } from 'express';

const tokenCookieOptions = {
  sameSite: 'none' as const,
  httpOnly: true,
  secure: true,
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignUpDto, @Res({ passthrough: true }) response: Response) {
    const accessToken = (await this.authService.signup(dto)).accessToken;
    response.cookie('accessToken', accessToken, tokenCookieOptions);

    return {
      data: true,
      message: PersianMessages.successfulSignup,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const accessToken = (await this.authService.login(dto)).accessToken;
    response.cookie('accessToken', accessToken, tokenCookieOptions);

    return {
      data: true,
      message: PersianMessages.successfulLogin,
    };
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('accessToken', '', tokenCookieOptions);

    return {
      data: true,
      message: PersianMessages.successfulLogout,
    };
  }
}
