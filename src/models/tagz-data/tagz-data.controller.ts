import { Controller, Get, UseGuards } from '@nestjs/common';
import { TagzDataService } from 'models/tagz-data/tagz-data.service';
import { JwtGuard } from '@/models/auth/guard';
import { GetUser } from '@/models/auth/decorator';
import { PartialUser } from '@/models/user/entities';

@UseGuards(JwtGuard) // a guard for the controller
@Controller('tagz-data')
export class TagzDataController {
  constructor(private readonly tagzDataService: TagzDataService) {}

  @Get('count')
  async numberOfTagz(@GetUser() user: PartialUser) {
    const data = await this.tagzDataService.numberOfTagz(user.username);
    return {
      data,
      message: 'ok',
    };
  }

  @Get('batteries')
  async getBatteries(@GetUser() user: PartialUser) {
    const data = await this.tagzDataService.getBatteries(user.username);
    return {
      data,
      message: 'ok',
    };
  }
  @Get('messages')
  async getMessages(@GetUser() user: PartialUser) {
    const data = await this.tagzDataService.getMessages(user.username);
    return {
      data,
      message: 'ok',
    };
  }

  @Get('locations')
  async getLocations(@GetUser() user: PartialUser) {
    const data = await this.tagzDataService.getLocations(user.username);
    return {
      data,
      message: 'ok',
    };
  }
}
