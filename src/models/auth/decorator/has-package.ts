import { SetMetadata } from '@nestjs/common';
import { PackagesLevelEnum } from '@/models/auth/packagesLevel.enum';

export const PackagesLevel = (...packagesLevels: PackagesLevelEnum[]) => SetMetadata('packageLevel', packagesLevels);
