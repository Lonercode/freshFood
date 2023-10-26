import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodsModule } from './foods/foods.module';
import { NavModule } from './nav/nav.module';
import { SideBarModule } from './side-bar/side-bar.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FoodsModule,
    NavModule,
    SideBarModule
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
