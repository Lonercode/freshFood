import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path: '', 
  component: HomeComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'orders',
  component: OrdersComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
