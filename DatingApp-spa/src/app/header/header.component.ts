import { Component, OnInit } from '@angular/core';
import { faFireAlt, faUserAlt, faKey, faUserTag, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/Services/Auth.service';
import { AlertsService } from '../shared/Services/Alerts.service';
import { Router } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faFireAlt = faFireAlt;
  faUserAlt = faUserAlt;
  faKey = faKey;
  faUserTag = faUserTag;
  faUserCircle = faUserCircle;
  formLogin: FormGroup;
  login = false;
  load: boolean = false;

  constructor(public authService: AuthService,
              private alerts: AlertsService,
              private router: Router) {}

  ngOnInit() {
    this.formLogin = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ])
    });

    
  }

  onSubmit() {
    

    this.load = true;

    this.authService.Login(this.formLogin.value).subscribe(
      next => {
        setTimeout(() => {
          this.alerts.success('logueado correctamente');
          this.loggedIn()
          this.load = false;
          this.router.navigate(['/members']);
        }, 1500);
      },
      error => {
        setTimeout(() => {
          this.alerts.error('Un error ha ocurrido: ' + error);
          this.loggedIn()
          this.load = false;
        }, 1500);
      }
    );




  }

  loggedIn(){
 return this.authService.loggedIn();
  }


  logout() {
    localStorage.removeItem('token');
    this.login = false;
    this.alerts.message('desconectado correctamente');
    this.router.navigate(['/home']);
  }
}
