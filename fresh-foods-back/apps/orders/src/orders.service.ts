import { Injectable, Inject } from '@nestjs/common';
import { createOrdersDto } from './dto/create-orders';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from '@app/common/constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { updateOrdersDTO } from './dto/update-orders.dto';
import { map } from 'rxjs';
import { Status } from './models/orders.schema';


@Injectable()
export class OrdersService {
  constructor(protected readonly ordersRepo: OrdersRepository, @Inject(BILLING_SERVICE) private billingClient: ClientProxy){}

  async createOrders(createOrderDto: createOrdersDto, requestedBy: UserDto) {
    return this.billingClient.send('create_bill', {
      amountInNaira: createOrderDto.quantity * 3,
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
        payment: {
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
}
