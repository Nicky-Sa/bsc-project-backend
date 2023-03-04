import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/models/prisma/prisma.service";
import { TagBalanceUsage, TagBatteryLevel, TagLocation, TagMessage } from "@/models/fetch-tagz-data/dto/updateTagz.dto";
import { dbItemsTransform } from "@/services/functions";

@Injectable()
export class FetchTagzDataService {
  constructor(private prismaService: PrismaService) {
  }

  async addTagBatteryLevel(data: TagBatteryLevel[], username: string) {
    try {
      for (const record of data) {
        await this.prismaService.tagBatteryLevel.upsert({
          where: {
            tagId_dateTime: {
              tagId: record.tagId,
              dateTime: new Date(record.dateTime),
            },
          },
          update: {},
          create: {
            tagId: record.tagId,
            value: record.value,
            dateTime: new Date(record.dateTime),
          },
        });
      }
      const items = await this.prismaService.tagBatteryLevel.findMany({
        where: {
          associatedTag: {
            username: username,
          },
        },
        orderBy: {
          dateTime: 'desc',
        },
      });
      return dbItemsTransform(items, 'tagId', 'dateTime', false);
    } catch (error) {
      throw error;
    }
  }

  async addTagMessage(data: TagMessage[], username: string) {
    try {
      for (const record of data) {
        await this.prismaService.tagMessage.upsert({
          where: {
            tagId_text_dateTime: {
              tagId: record.tagId,
              text: record.text,
              dateTime: new Date(record.dateTime),
            },
          },
          update: {},
          create: {
            tagId: record.tagId,
            type: record.type,
            text: record.text,
            dateTime: new Date(record.dateTime),
          },
        });
      }
      const items = await this.prismaService.tagMessage.findMany({
        where: {
          associatedTag: {
            username: username,
          },
        },
        orderBy: {
          dateTime: 'desc',
        },
      });
      return dbItemsTransform(items, 'tagId', 'dateTime');
    } catch (error) {
      throw error;
    }
  }

  async addTagLocation(data: TagLocation[], username: string) {
    try {
      for (const record of data) {
        await this.prismaService.tagLocation.upsert({
          where: {
            tagId_lat_lon_dateTime: {
              tagId: record.tagId,
              lat: record.lat,
              lon: record.lon,
              dateTime: new Date(record.dateTime),
            },
          },
          update: {},
          create: {
            tagId: record.tagId,
            lat: record.lat,
            lon: record.lon,
            dateTime: new Date(record.dateTime),
          },
        });
      }
      const items = await this.prismaService.tagLocation.findMany({
        where: {
          associatedTag: {
            username: username,
          },
        },
        orderBy: {
          dateTime: "desc"
        }
      });
      return dbItemsTransform(items, "tagId", "dateTime");
    } catch (error) {
      throw error;
    }
  }

  async addTagBalanceUsage(data: TagBalanceUsage[], username: string) {
    try {
      for (const record of data) {
        await this.prismaService.tagBalanceUsage.upsert({
          where: {
            tagId_month: {
              tagId: record.tagId,
              month: record.month
            }
          },
          update: {},
          create: {
            tagId: record.tagId,
            value: record.value,
            month: record.month
          }
        });
      }
      const items = await this.prismaService.tagBalanceUsage.findMany({
        where: {
          associatedTag: {
            username: username
          }
        },
        orderBy: {
          id: "desc"
        }
      });
      return dbItemsTransform(items, "tagId", "");
    } catch (error) {
      throw error;
    }
  }

  async numberOfTagz(username: string) {
    try {
      return await this.prismaService.tag.count({
        where: {
          username: username
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
