import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private Http: HttpClient) {}


  changeMemberPhoto(photoUrl: string){

    this.photoUrl.next(photoUrl);

  }



  Login(formLogin: any) {
    return this.Http.post(
      this.baseUrl + 'login',
      formLogin
    ).pipe(
      map((response: any) => {
        const username = response;
        if (username) {
          localStorage.setItem('token', username.token);
          localStorage.setItem('user', JSON.stringify(username.user));
          this.decodedToken = this.jwtHelper.decodeToken(username.token);
          this.currentUser = username.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
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
