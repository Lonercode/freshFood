import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodsService } from './foods.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  foods$: Observable<any> | undefined;
  constructor(private foodsService: FoodsService) {};

  ngOnInit(): void {
    this.foods$ = this.foodsService.getFoods();
  }; 

}
