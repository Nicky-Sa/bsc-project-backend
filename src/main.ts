import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor, TransformResponseInterceptor } from './services/interceptor';
import { ErrorFilter } from './services/filters';
import * as cookieParser from 'cookie-parser';
import { addUuid } from './services/middleware';
import { Logger } from '@/services/helper/colorize';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.APP_DOMAIN,
      credentials: true,
    },
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, enableDebugMessages: true }));
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.use(cookieParser());
  app.use(addUuid);
  await app.listen(process.env.PORT);
  Logger.info(`Connected to port: ${process.env.PORT}`);
}

bootstrap();
