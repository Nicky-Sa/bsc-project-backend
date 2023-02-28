import { Controller, Get } from "@nestjs/common";
import { TagzDataService } from "models/tagz-data/tagz-data.service";

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
}
