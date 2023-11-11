import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  constructor(private httpClient: HttpClient){}
  API_SERVER = 'http://localhost/3000';

  getFoods(){
    return this.httpClient.get(`${this.API_SERVER}/products`);
  }
}
 
