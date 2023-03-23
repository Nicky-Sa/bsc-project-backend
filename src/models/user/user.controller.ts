import { Body, Controller, Get, Injectable, Put, UseGuards } from '@nestjs/common';
import { UserService } from 'models/user/user.service';
import { JwtGuard } from '@/models/auth/guard';
import { GetUser } from '@/models/auth/decorator';
import { PartialUser, User } from 'models/user/entities';
import { UpdateUserDto } from 'models/user/dto';
import { PersianMessages } from '@/utils/persianTexts';
import { PackagesLevel } from '@/models/auth/decorator/has-package';
import { PackagesLevelEnum } from '@/models/auth/packagesLevel.enum';
import { PackageLevelGuard } from '@/models/auth/guard/packageLevel.guard';

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
      },
      message: PersianMessages.currentUser,
    };
  }

  @Put('update')
  @PackagesLevel(PackagesLevelEnum.Gold)
  @UseGuards(PackageLevelGuard)
  async updateUser(@GetUser('username') username: User['username'], @Body() dto: UpdateUserDto) {
    return {
      data: await this.userService.updateUser(username, dto),
      message: PersianMessages.successfulUpdateUser,
    };
  }
}
