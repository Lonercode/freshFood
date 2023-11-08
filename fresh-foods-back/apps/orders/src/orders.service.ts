import { Injectable, Inject } from '@nestjs/common';
import { createOrdersDto } from './dto/create-orders';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from '@app/common/constants';
import { ClientProxy } from '@nestjs/microservices';
import { updateOrdersDTO } from './dto/update-orders.dto';
import { map } from 'rxjs';
import { Status } from './models/orders.schema';
import { UserDto } from '@app/common/dto/user.dto';
import { UnprocessableEntityException, HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';


@Injectable()
export class OrdersService {
  constructor(protected readonly ordersRepo: OrdersRepository, @Inject(BILLING_SERVICE) private billingClient: ClientProxy){}

  async createOrders(createOrderDto: createOrdersDto, requestedBy: UserDto) {
    return this.billingClient.send('create_bill', {
      amountInNaira: createOrderDto.quantity * createOrderDto.price,
      email: requestedBy.email,
    }).pipe(
      map(async (response) => {
      const newOrder = await this.ordersRepo.create({
        ...createOrderDto,
        timestamp: new Date(),
        requestedBy: requestedBy._id,
        status: Status.PENDING,
        assignedTo: null,
        completedAt: null,
        notes: null,
        invoiceId: response.data.reference,
        price: null,
        location: null,
      });

      return {
        ...newOrder,
        billing: {
          ...response.data,
        }
      }
    })
    );
    
  }


  async getOrders(){
    return this.ordersRepo.find({});
  }

  async updateOrders(_id: string, updateOrdersDTO: updateOrdersDTO){
    return this.ordersRepo.findOneAndUpdate(
      {_id},
      {$set: updateOrdersDTO});

  }

  async getOrder(_id: string){
    return this.ordersRepo.findOne({_id});

  }

  async deleteOrders(_id: string){
    return this.ordersRepo.findOneAndDelete({_id});
  }

  async startOrder(orderId: string) {
    const order = await this.ordersRepo.findOne({ _id: orderId });

    if (order.status !== Status.PENDING) {
      throw new UnprocessableEntityException('Order has been made');
    }

    return this.billingClient.send('verify_charge', order.invoiceId).pipe(
      map(async (response) => {
        if (response.data.status === 'success') {
          
          const updatedOrder = this.ordersRepo.findOneAndUpdate(
            { _id: orderId },
            { $set: { status: Status.INITIATED } },
          );
          
          /*const mailTemplate = 
          `Your order has been confirmed. 
          Order ID: ${orderId}. 
          Qty: ${order.sizeInKg}kg. 
          Amount: NGN${response.data.amount / 100}. 
          Invoice ID: ${order.invoiceId}`;

          this.notificationsService.emit('notify_email', {
            email: response.data.customer.email,
            template: mailTemplate,
            subject: 'Order Confirmation',
          });*/

          return updatedOrder;
        }
        throw new HttpException('Payment Required', HttpStatus.PAYMENT_REQUIRED);
      }),
    );
  }
}
