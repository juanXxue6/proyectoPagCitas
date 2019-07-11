import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'http://localhost:5000/api/auth/';

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
        }
      })
    );
  }

  register(formLogin: any) {

    return this.Http.post(this.baseUrl + 'register', formLogin);



  }





}
