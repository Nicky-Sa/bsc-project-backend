import { Module } from "@nestjs/common";
import { FetchTagzDataService } from "@/models/fetch-tagz-data/fetch-tagz-data.service";

@Module({
  providers: [FetchTagzDataService],
  exports: [FetchTagzDataService],
})
export class FetchTagzDataModule {}
