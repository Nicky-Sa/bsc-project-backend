import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PackagesLevelEnum } from '@/utils/packagesLevel.enum';

@Injectable()
export class PackageLevelGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPackageLevels = this.reflector.getAllAndOverride<PackagesLevelEnum[]>('packageLevel', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPackageLevels) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredPackageLevels.some((level) => user.currentPackageLevel === level);
  }
}
