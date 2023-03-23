import { SetMetadata } from '@nestjs/common';
import { PackagesLevelEnum } from '@/utils/packagesLevel.enum';

export const PackagesLevel = (...packagesLevels: PackagesLevelEnum[]) => SetMetadata('packageLevel', packagesLevels);
