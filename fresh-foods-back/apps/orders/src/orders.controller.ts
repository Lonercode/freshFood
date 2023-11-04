import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrdersDto } from './dto/create-orders';
import { updateOrdersDTO } from './dto/update-orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrders(@Body() request: createOrdersDto, requestedBy: UserDto){
    return this.ordersService.createOrders(request, requestedBy);
  }


  @Get(':id')
  async getOrder(@Param('id') id: string){
    return this.ordersService.getOrder(id);
  }

  @Patch(':id')
  async updateOrders(@Param('id') id: string, @Body() updateOrderDTO: updateOrdersDTO){
    return this.ordersService.updateOrders(id, updateOrderDTO);
  }

  @Get()
  async getOrders(){
    return this.ordersService.getOrders();
  }

  @Delete(':id')
  async deleteOrders(@Param('id') id: string){
    return this.ordersService.deleteOrders(id);
  }
}
