import { Injectable } from '@nestjs/common';
import { createBillDto } from './dto/create-bill.dto';
import * as paystack from 'paystack-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BillingService {
  private readonly paystack = new paystack(
    this.configService.get<number>('PAYSTACK_SECRECT_KEY'),
    this.configService.get<string>('PAYSTACK_ENVIORNMENT')
  );

  constructor(private readonly configService: ConfigService){}

  async startTransaction({amount, email}: createBillDto){
    const newPay = await this.paystack.initializeTransaction({
      reference: `b_g${Date.now()}${Math.floor(Math.random() * 1000)}}`,
      amount: amount * 100, // amount in kobo
      email,
    });

    return newPay.body;
  }
}
