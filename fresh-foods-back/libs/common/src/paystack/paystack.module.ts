import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PaystackService } from './paystack.service';
import { PAYSTACK_OPTIONS } from '../constants';
import { PaystackModuleOptions, PaystackModuleAsyncOptions } from '../interfaces';


@Module({
    imports: [HttpModule],
})
export class PaystackModule {
    static registerAsync(options: PaystackModuleAsyncOptions): DynamicModule {
        return {
          module: PaystackModule,
          imports: options.imports || [],
          providers: [
            ...this.createAsyncProviders(options),
            PaystackService,
          ],
          exports: [PaystackService],
        };
      }

    private static createAsyncProviders(options: PaystackModuleAsyncOptions): any[] {
        if (options.useFactory) {
          return [
            {
              provide: 'PAYSTACK_OPTIONS',
              useFactory: options.useFactory,
              inject: options.inject || [],
            },
          ];
        }
      }
}
