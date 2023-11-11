import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit{
    displayedStuff: string[] = ['id', 'location', 'quantity', 'price'];
    data: any = [];
    order = {};
    constructor(private ordersService: OrdersService) {};
  
    ngOnInit(){
      this.ordersService.getOrders().subscribe((result) => {
        this.data = result;
      });
    }; 
  
    selectOrder(order){
      this.order = order;
    }
  
    newOrder(){
      this.order = {};
    }
  
    createOrder(order){
      this.ordersService.createOrder(order.value).subscribe((result) => {
        console.log(result);
      })
    }
  
  }
  

