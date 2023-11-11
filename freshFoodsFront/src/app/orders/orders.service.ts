import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }
  API_SERVER = 'http://localhost:3000/orders';

  public getOrders(){
    return this.httpClient.get(`${this.API_SERVER}`);
  }

  public getOrder(id: number){
    return this.httpClient.get(`${this.API_SERVER}/${id}`);
  }

  public createOrder(order:Orders ){
    return this.httpClient.post<Orders>(`${this.API_SERVER}`, order);
  }

}

