import { Module } from "@nestjs/common";
import { TagzDataService } from "models/tagz-data/tagz-data.service";
import { TagzDataController } from "models/tagz-data/tagz-data.controller";
import { FetchTagzDataModule } from "@/models/fetch-tagz-data/fetch-tagz-data.module";

@Module({
  controllers: [TagzDataController],
  providers: [TagzDataService],
  imports: [FetchTagzDataModule],
})
export class TagzDataModule {}
