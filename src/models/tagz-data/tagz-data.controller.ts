import { Controller, Get } from '@nestjs/common';
import { TagzDataService } from 'models/tagz-data/tagz-data.service';

@Controller('tagz-data')
export class TagzDataController {
  constructor(private readonly tagzDataService: TagzDataService) {}

  @Get('batteries')
  async getBatteries() {
    const data = await this.tagzDataService.getBatteries();
    return {
      data,
      message: 'ok',
    };
  }
  @Get('messages')
  async getMessages() {
    const data = await this.tagzDataService.getMessages();
    return {
      data,
      message: 'ok',
    };
  }

  @Get('locations')
  async getLocations() {
    const data = await this.tagzDataService.getLocations();
    return {
      data,
      message: 'ok',
    };
  }
}
