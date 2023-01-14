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

@UseGuards(JwtGuard) // a guard for the controller
@Controller('users')
@Injectable()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('current')
  userInfo(@GetUser() user: PartialUser) {
    return user;
  }

  @Patch('update')
  updateUser(
    @GetUser('username') username: User['username'],
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser({ username }, dto);
  }
}
