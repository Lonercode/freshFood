import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common';
import { ProductsDocument, ProductsSchema } from './schemas/products.schema';
import { ProductsRepository } from '../products.repository';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      MONGO_DB: Joi.string().required(),
      PORT: Joi.number().required()
    }),
    envFilePath: './apps/products/.env'
  }),
DatabaseModule,
DatabaseModule.forFeature([{ name: ProductsDocument.name, schema: ProductsSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
