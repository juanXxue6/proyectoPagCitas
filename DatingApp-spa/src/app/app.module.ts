import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';;
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownDirective } from './shared/dropdown/dropdown.directive';
import { LoadSpinnerComponent } from './shared/Load-spinner/load-spinner.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvide } from './shared/Services/error.interceptor';
import { MatchesComponent } from './members/matches/matches.component';
import { ListComponent } from './members/list/list.component';
import { MessagesComponent } from './members/messages/messages.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './_guards/auth.guard';


@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      HeaderComponent,
      LoadSpinnerComponent,
      DropdownDirective,
      RegisterComponent,
      HomeComponent,
      MatchesComponent,
      ListComponent,
      MessagesComponent,
      MembersComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FontAwesomeModule,
      ReactiveFormsModule
   ],
   providers: [
      ErrorInterceptorProvide,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
