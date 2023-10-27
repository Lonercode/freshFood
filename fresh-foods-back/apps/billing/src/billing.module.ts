import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@app/common/logger';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BILLING_SERVICE } from '@app/common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PAYSTACK_SECRET_KEY: Joi.number().required(),
        PAYSTACK_ENVIRONMENT: Joi.string().required()
      })
    }),
    LoggerModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
