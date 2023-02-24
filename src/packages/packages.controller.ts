import { Controller, Get } from '@nestjs/common';
import { PackagesService } from './packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}
  @Get('all')
  async getAllPackages() {
    const data = await this.packagesService.findAll();
    return {
      data,
      message: 'ok',
    };
  }
}
