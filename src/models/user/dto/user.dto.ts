import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import { PackagesLevelEnum } from '@/utils/packagesLevel.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsNumberString()
  phoneNumber?: string;

  @IsOptional()
  fullName?: string;
}

export class BuyNewPackageDto {
  @IsNotEmpty()
  packageLevel: PackagesLevelEnum;
}
