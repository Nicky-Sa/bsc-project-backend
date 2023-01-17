import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  LoggerInterceptor,
  TransformResponseInterceptor,
} from './services/interceptor';
import { ErrorFilter } from './services/filters';
import { addUuid } from './services/middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.use(addUuid);
  await app.listen(5002);
}

bootstrap();
