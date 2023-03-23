import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/models/prisma/prisma.service';
import { dbItemsTransform } from '@/services/functions';

@Injectable()
export class TransactionsService {
  constructor(private prismaService: PrismaService) {}

  async getAll(username: string) {
    const items = await this.prismaService.transaction.findMany({
      where: {
        username: username,
      },
      orderBy: {
        dateTime: 'desc',
      },
    });
    return dbItemsTransform(items, '', 'dateTime');
  }

  async add(username: string, value: number, reason: string) {
    const items = await this.prismaService.transaction.create({
      data: {
        username,
        value,
        reason,
        status: 'موفق',
      },
    });
    return !!items;
  }
}
