import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodsService } from './foods.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit{
  data: any = [];
  constructor(private foodsService: FoodsService){}

  ngOnInit(): void {
      this.foodsService.getFoods().subscribe((result) => {
        this.data = result;
      })
  }
}