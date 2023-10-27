import { Injectable, Inject } from '@nestjs/common';
import { createOrdersDto } from './dto/create-orders';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from '@app/common/constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(protected readonly ordersRepo: OrdersRepository, @Inject(BILLING_SERVICE) private billingClient: ClientProxy){}

  async createOrders(request: createOrdersDto){
    const session = await this.ordersRepo.startTransaction();
    try{
      const order = await this.ordersRepo.create(request, {session});
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
        }),
      );
      await session.commitTransaction();
      return order;
    } catch(err){
        session.abortTransaction();
        throw err;
    }
  }

  getOrders(){
    return this.ordersRepo.find({});
  }
}
