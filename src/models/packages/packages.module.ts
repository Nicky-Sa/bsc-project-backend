import { Module } from "@nestjs/common";
import { PackagesService } from "models/packages/packages.service";
import { PackagesController } from "models/packages/packages.controller";

@Module({
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
