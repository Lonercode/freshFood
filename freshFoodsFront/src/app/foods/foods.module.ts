import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsComponent } from './foods.component';
import {HttpClientModule} from '@angular/common/http';                                                                   



@NgModule({
  declarations: [
    FoodsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    FoodsComponent
  ]
})
export class FoodsModule { }
