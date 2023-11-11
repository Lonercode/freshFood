import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodsModule } from './foods/foods.module';
import { NavModule } from './nav/nav.module';
import { SideBarModule } from './side-bar/side-bar.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FoodsModule,
    NavModule,
    SideBarModule,
    RouterModule
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
