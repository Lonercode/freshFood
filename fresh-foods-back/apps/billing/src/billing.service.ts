import { Injectable } from '@nestjs/common';
import { createBillDto } from './dto/create-bill.dto';
import * as paystack from 'paystack-node';
import { ConfigService } from '@nestjs/config';
import { PaystackService } from '@app/common/paystack/paystack.service';

@Injectable()
export class BillingService {

  constructor(
    private readonly paystack: PaystackService,
    ) {} 
  
  async startTransaction(
    { amount, email }: createBillDto
    ) {
    const paymentReference = `b_g${Date.now()}${Math.floor(Math.random() * 1000)}`;  
      return this.paystack.initializeTransaction(
        amount * 100,
        email,
        paymentReference,
      );
  }

  async verifyTransaction(reference: string) {
    return this.paystack.verifyTransaction(reference);
  }

}
