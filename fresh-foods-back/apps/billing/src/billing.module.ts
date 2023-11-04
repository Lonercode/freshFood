import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@app/common/logger';
import * as Joi from 'joi';
import { PaystackModule } from '@app/common/paystack/paystack.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PAYSTACK_SECRET_KEY: Joi.number().required(),
        PAYSTACK_ENVIRONMENT: Joi.string().required(),
        PAYSTACK_SUBACCOUNT_CODE: Joi.string().required(),
        PAYSTACK_BASE_URL: Joi.string().required()
      })
    }),
    LoggerModule,
    PaystackModule.registerAsync({
      useFactory: (configService: ConfigService) =>({
        paystackSecretKey: configService.get('PAYSTACK_SECRET_KEY'),
        paystackBaseUrl: configService.get('PAYSTACK_BASE_URL'),
        paystackSubaccountCode: configService.get('PAYSTACK_SUBACCOUNT_CODE')
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
