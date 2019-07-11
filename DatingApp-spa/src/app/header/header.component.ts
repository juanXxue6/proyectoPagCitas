import { Component, OnInit } from '@angular/core';
import { faFireAlt, faUserAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../Services/Auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faFireAlt = faFireAlt;
  faUserAlt = faUserAlt;
  faKey = faKey;
  formLogin: FormGroup;
  login = false;
  load: boolean = false;

  constructor(private authService: AuthService) {}

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
    console.log(this.formLogin);

    this.load = true;

    this.authService.Login(this.formLogin.value).subscribe(
      next => {
        setTimeout(() => {
          console.log('Usted se ha conectado :D');
          this.login = true;
          this.load = false;
        }, 1500);
      },
      error => {
        setTimeout(() => {
          console.log(error);
          this.login = false;
          this.load = false;
        }, 1500);
      }
    );
  }

  logout() {
    this.login = false;
  }
}
