import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./models/auth/auth.module";
import { UserModule } from "./models/user/user.module";
import { PrismaModule } from "./models/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { PackagesModule } from "./models/packages/packages.module";
import { TagzDataModule } from "./models/tagz-data/tagz-data.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { FetchTagzDataService } from "./models/fetch-tagz-data/fetch-tagz-data.service";
import { FetchTagzDataModule } from "models/fetch-tagz-data/fetch-tagz-data.module";

console.log(__dirname);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    PackagesModule,
    TagzDataModule,
    FetchTagzDataModule,
  ],
  controllers: [AppController],
  providers: [AppService, FetchTagzDataService],
})
export class AppModule {}
