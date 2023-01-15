import {
  Body,
  Controller,
  Get,
  Injectable,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { PartialUser, User } from './entities';
import { UpdateUserDto } from './dto';
import persianMessage from '../../utils/persian.message';

@UseGuards(JwtGuard) // a guard for the controller
@Controller('users')
@Injectable()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('current')
  currentUser(@GetUser() user: PartialUser, @Req() request) {
    console.log(request);
    return {
      data: user,
      message: persianMessage.currentUser,
    };
  }

  @Patch('update')
  async updateUser(
    @GetUser('username') username: User['username'],
    @Body() dto: UpdateUserDto,
  ) {
    return {
      data: await this.userService.updateUser({ username }, dto),
      message: persianMessage.updateUser,
    };
  }
}
