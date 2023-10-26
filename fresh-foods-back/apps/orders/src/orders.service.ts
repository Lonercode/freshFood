import { Injectable } from '@nestjs/common';
import { createOrdersDto } from './dto/create-orders';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(protected readonly ordersRepo: OrdersRepository){}

  createOrders(request: createOrdersDto){
    return this.ordersRepo.create(request);
  }

  getOrders(){
    return this.ordersRepo.find({});
  }
}
