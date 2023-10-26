import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrdersDto } from './dto/create-orders';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrders(@Body() request: createOrdersDto){
    return this.ordersService.createOrders(request);
  }

  @Get()
  getOrders(){
    return this.ordersService.getOrders();
  }
}
