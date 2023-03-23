import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/models/prisma/prisma.service';

@Injectable()
export class PackagesService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.package.findMany({
      where: {},
      include: { features: true },
    });
  }

  async findOne(level: string) {
    return await this.prismaService.package.findUnique({
      where: { level },
      include: { features: true },
    });
  }
}
