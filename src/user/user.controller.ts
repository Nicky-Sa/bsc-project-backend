import {
  Body,
  Controller,
  Get,
  Injectable,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { PartialUser, User } from './entities';
import { UpdateUserDto } from './dto';
import { EnglishMessages } from '../../utils/englishTexts';

@UseGuards(JwtGuard) // a guard for the controller
@Controller('users')
@Injectable()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('current')
  currentUser(@GetUser() user: PartialUser) {
    return {
      data: user,
      message: EnglishMessages.currentUser,
    };
  }

  @Patch('update')
  async updateUser(
    @GetUser('username') username: User['username'],
    @Body() dto: UpdateUserDto,
  ) {
    return {
      data: await this.userService.updateUser({ username }, dto),
      message: EnglishMessages.successfulUpdateUser,
    };
  }
}
