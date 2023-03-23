import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/models/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@/models/user/entities';
import { PersianErrors } from '@/utils/persianTexts.enum';
import { BuyNewPackageDto, UpdateUserDto } from '@/models/user/dto';
import { PackagesService } from '@/models/packages/packages.service';
import { TransactionsService } from '@/models/transactions/transactions.service';
import { translate } from '@/utils/functions';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private packagesServices: PackagesService,
    private transactionsService: TransactionsService,
  ) {}

  async create(data: User) {
    try {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
      return await this.prismaService.user.create({ data });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') throw new ForbiddenException(`فیلد تکراری: ${error.meta.target}`);
      }
      throw error;
    }
  }

  async findOne(username: User['username']) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
      include: { Tags: true, Transactions: true },
    });
    if (!user) {
      throw new ForbiddenException(PersianErrors.noSuchUser);
    }
    return user;
  }

  async updateUser(username: User['username'], dto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { username },
      data: dto,
    });
    if (!user) {
      throw new ForbiddenException(PersianErrors.noSuchUser);
    }
    return user;
  }

  async buyNewPackage(username: User['username'], dto: BuyNewPackageDto) {
    const packagePrice = parseInt(
      (await this.packagesServices.findOne(dto.packageLevel))?.features.find((feature) => feature.key === 'قیمت').value,
    );
    if (!packagePrice) {
      throw new ForbiddenException(PersianErrors.noSuchPackage);
    }

    const user = await this.prismaService.user.update({
      where: { username },
      data: { currentPackageLevel: dto.packageLevel, currentBalance: packagePrice },
    });

    if (!user) {
      throw new ForbiddenException(PersianErrors.noSuchUser);
    } else {
      await this.transactionsService.add(username, packagePrice, ` خرید پکیج ${translate(dto.packageLevel)}`);
    }
    return user;
  }
}
