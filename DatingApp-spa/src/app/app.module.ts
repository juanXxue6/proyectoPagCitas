import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValuesComponent } from './values/values.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';;
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownDirective } from './shared/dropdown.directive';
import { LoadSpinnerComponent } from './shared/Load-spinner/load-spinner.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvide } from './Services/error.interceptor';


@NgModule({
   declarations: [
      AppComponent,
      ValuesComponent,
      HeaderComponent,
      HeaderComponent,
      LoadSpinnerComponent,
      DropdownDirective,
      RegisterComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FontAwesomeModule,
      ReactiveFormsModule
   ],
   providers: [ErrorInterceptorProvide],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
