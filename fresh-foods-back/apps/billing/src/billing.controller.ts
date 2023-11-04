import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { createBillDto } from './dto/create-bill.dto';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @MessagePattern('create_bill')
  async  createBill(@Payload() data: createBillDto) { 
    return this.billingService.startTransaction(data);
  }

  @MessagePattern('verify_bill')
  async verifyBill(reference: string) {
    return this.billingService.verifyTransaction(reference);
  }
}
