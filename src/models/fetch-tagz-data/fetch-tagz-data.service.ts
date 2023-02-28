import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/models/prisma/prisma.service";
import { TagBatteryLevel } from "@/models/fetch-tagz-data/dto/updateTagz.dto";

@Injectable()
export class FetchTagzDataService {
  constructor(private prismaService: PrismaService) {}
  async addBatteryLevel(data: TagBatteryLevel[]) {
    try {
      return await this.prismaService.tagBatteryLevel.createMany({ data });
    } catch (error) {
      throw error;
    }
  }
}
