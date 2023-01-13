import { Controller, Get, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
@Injectable()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('userInfo')
  userInfo() {
    // return this.userService.findOne();
    return 'user info';
  }
}
