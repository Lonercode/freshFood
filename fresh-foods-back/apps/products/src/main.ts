import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  await app.listen(configService.get('PORT'));
}
bootstrap();
