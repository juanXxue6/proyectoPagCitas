import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faKey, faUserAlt, faToriiGate } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../shared/Services/Auth.service';
import { AlertsService } from '../../shared/Services/Alerts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() LeaveRegister = new EventEmitter<boolean>();
  registerForm: FormGroup;
  faKey = faKey;
  faUserAlt = faUserAlt;
  faToriiGate = faToriiGate;
  load: boolean = false;

  constructor(private authService: AuthService,
              private alerts: AlertsService) { }

  ngOnInit() {

    this.registerForm = new FormGroup({

      username: new FormControl( null, Validators.required),
      value: new FormControl( null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(8)])

    });


  
  }

  cancelEvent() {

    this.LeaveRegister.emit(false);

  
  }

register(){
            this.authService
              .register(this.registerForm.value)
              .subscribe(
                () => {
                  this.load = true;

                  setTimeout(() => {
                    this.alerts.success("Registrado correctamnte :D");

                    this.load = false;
                  }, 1500);
                },
                error => {
                  this.load = true;
                  setTimeout(() => {
                    this.alerts.error(
                      "Un error ha ocurrido: " + error
                    );

                    this.load = false;
                    console.log(error);
                  }, 1500);
                }
              );
          }


}
