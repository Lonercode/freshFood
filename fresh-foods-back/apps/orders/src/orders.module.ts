import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { OrdersRepository } from './orders.repository';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrdersSchema } from './models/orders.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BILLING_SERVICE } from '@app/common/constants';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from '@app/common/logger';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
      PORT: Joi.number().required(),
      BILLING_HOST: Joi.string().required(),
      BILLING_TCP_PORT: Joi.number().required()
      }),
      envFilePath: './apps/orders/.env'
    }),
    LoggerModule,
    DatabaseModule,
    MongooseModule.forFeature([{name: Orders.name, schema: OrdersSchema}]),
    ClientsModule.registerAsync([
      {
        name: BILLING_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options:{
            host: configService.get('BILLING_HOST'),
            port: configService.get('BILLING_TCP_PORT')
          }
        }),
        inject: [ConfigService]
    }
  ])
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
