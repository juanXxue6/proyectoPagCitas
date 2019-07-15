import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import {TabsModule} from 'ngx-bootstrap';
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
import { userCardComponent } from './members/list/user_card/userCard.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { from } from 'rxjs';


export function tokenGetter() {
   return localStorage.getItem('token')
}


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
      MembersComponent,
      userCardComponent,
      MemberDetailsComponent

   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FontAwesomeModule,
      ReactiveFormsModule,
      TabsModule.forRoot(),
      JwtModule.forRoot({
         config: {
         tokenGetter: tokenGetter,
         whitelistedDomains: ['localhost:5000'],
         blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
      

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
