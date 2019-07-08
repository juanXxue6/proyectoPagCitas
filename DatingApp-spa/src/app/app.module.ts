import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValuesComponent } from './values/values.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';;


import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      ValuesComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FontAwesomeModule

      
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
