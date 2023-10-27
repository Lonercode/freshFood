import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  app.use(cookieParser()); 
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'));
}
bootstrap();
