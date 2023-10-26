import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  constructor(private httpClient: HttpClient) { }

  getFoods(){
    return this.httpClient.get('http://localhost:3000/');
  }
}
