import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrdersDto } from './dto/create-orders';
import { updateOrdersDTO } from './dto/update-orders.dto';
import { UserDto } from '@app/common/dto/user.dto';
import { UserJwtStrategy } from '@app/common/strategies/users-jwt.strategy';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { jwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(UserJwtStrategy)
  @Post()
  async createOrders(@Body() request: createOrdersDto, @CurrentUser() user: UserDto){
    return this.ordersService.createOrders(request, user);
  }


  @UseGuards(jwtAuthGuard)
  @Get(':id')
  async getOrder(@Param('id') id: string){
    return this.ordersService.getOrder(id);
  }

  @UseGuards(jwtAuthGuard)
  @Patch(':id')
  async updateOrders(@Param('id') id: string, @Body() updateOrderDTO: updateOrdersDTO){
    return this.ordersService.updateOrders(id, updateOrderDTO);
  }

  @UseGuards(jwtAuthGuard)
  @Get()
  async getOrders(){
    return this.ordersService.getOrders();
  }

  @UseGuards(jwtAuthGuard)
  @Delete(':id')
  async deleteOrders(@Param('id') id: string){
    return this.ordersService.deleteOrders(id);
  }

  @UseGuards(jwtAuthGuard)
  @Post('start/:orderId')
  async startOrder(@Param('orderId') order: string){
    return this.ordersService.startOrder(order);

  }

}
