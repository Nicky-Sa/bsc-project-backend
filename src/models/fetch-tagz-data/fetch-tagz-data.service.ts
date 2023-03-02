import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/models/prisma/prisma.service';
import { TagBatteryLevel, TagMessage } from '@/models/fetch-tagz-data/dto/updateTagz.dto';

@Injectable()
export class FetchTagzDataService {
  constructor(private prismaService: PrismaService) {}

  async addTagBatteryLevel(data: TagBatteryLevel[]) {
    try {
      for (const record of data) {
        await this.prismaService.tagBatteryLevel.upsert({
          where: {
            tagId_date: {
              tagId: record.tagId,
              date: record.date,
            },
          },
          update: {},
          create: {
            tagId: record.tagId,
            value: record.value,
            date: record.date,
          },
        });
      }
      return await this.prismaService.tagBatteryLevel.findMany({});
    } catch (error) {
      throw error;
    }
  }

  async addTagMessage(data: TagMessage[]) {
    try {
      for (const record of data) {
        await this.prismaService.tagMessage.upsert({
          where: {
            tagId_text_dateTime: {
              tagId: record.tagId,
              text: record.text,
              dateTime: record.dateTime,
            },
          },
          update: {},
          create: {
            tagId: record.tagId,
            type: record.type,
            text: record.text,
            dateTime: record.dateTime,
          },
        });
      }
      return await this.prismaService.tagMessage.findMany({});
    } catch (error) {
      throw error;
    }
  }
}
