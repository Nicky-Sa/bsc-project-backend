import { Body, Controller, Get, Injectable, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { PartialUser, User } from './entities';
import { UpdateUserDto } from './dto';
import { PersianMessages } from '../../utils/persianTexts';

@UseGuards(JwtGuard) // a guard for the controller
@Controller('users')
@Injectable()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('current')
  currentUser(@GetUser() user: PartialUser) {
    return {
      data: {
        ...user,
        // TODO: make it real?
        balanceLeft: 0,
      },
      message: PersianMessages.currentUser,
    };
  }

  @Put('update')
  async updateUser(@GetUser('username') username: User['username'], @Body() dto: UpdateUserDto) {
    return {
      data: await this.userService.updateUser(username, dto),
      message: PersianMessages.successfulUpdateUser,
    };
  }
}
