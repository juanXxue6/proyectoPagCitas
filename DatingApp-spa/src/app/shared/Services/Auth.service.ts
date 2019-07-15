import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private Http: HttpClient) {}

  Login(formLogin: any) {
    return this.Http.post(
      this.baseUrl + 'login',
      formLogin
    ).pipe(
      map((response: any) => {
        const username = response;

        if (username) {
          localStorage.setItem('token', username.token);
          this.decodedToken = this.jwtHelper.decodeToken(username.token)
          console.log(this.decodedToken)
        }
      })
    );
  }

  register(formLogin: any) {

    return this.Http.post(this.baseUrl + 'register', formLogin);


  }

loggedIn(){

  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
  
  
}




}
