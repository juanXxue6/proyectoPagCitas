import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  faKey,
  faUserAlt,
  faToriiGate,
  faCalendarAlt,
  faCity,
  faFlag,
  faVenusMars,
  faSmile,
  faFireAlt
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../shared/Services/Auth.service";
import { AlertsService } from "../../shared/Services/Alerts.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output() LeaveRegister = new EventEmitter<boolean>();
  registerForm: FormGroup;
  loginForm: FormGroup;
  faKey = faKey;
  faUserAlt = faUserAlt;
  faToriiGate = faToriiGate;
  faCalendarAlt = faCalendarAlt;
  faCity = faCity;
  faFlag = faFlag;
  faVenusMars = faVenusMars;
  faSmile = faSmile;
  faFireAlt = faFireAlt;

  load: boolean = false;

  constructor(
    private authService: AuthService,
    private alerts: AlertsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        username: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9_-]*"),
          Validators.maxLength(10)
        ]),

        knowAs: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9_-]*"),
          Validators.maxLength(16)
        ]),

        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ]),

        repeatPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ]),

        date: new FormControl(null, Validators.required),

        gender: new FormControl(null, Validators.required),

        city: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-zA-Z ]*")
        ]),

        country: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-zA-Z ]*")
        ])
      },
      this.comparePasswordValidator
    );


    
  }

  cancelEvent() {
    this.LeaveRegister.emit(false);
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(
      () => {
        this.load = true;
        this.alerts.success("Registrado correctamnte");

        this.loginForm = new FormGroup({
          username: new FormControl(this.registerForm.value.username),
          password: new FormControl(this.registerForm.value.password)
        });

        this.authService.Login(this.loginForm.value).subscribe(
          next => {
            this.loggedIn();
            this.load = false;
            this.router.navigate(["/members"]);
          },
          error => {
            this.alerts.error("Un error ha ocurrido: " + error);
            this.loggedIn();
            this.load = false;
          }
        );
      },
      error => {
        this.load = true;
        this.alerts.error("Un error ha ocurrido: " + error);
        this.load = false;
        console.log(error);
      }
    );

    console.log(this.registerForm.value);
  }

  comparePasswordValidator(g: FormGroup) {
    return g.get("password").value === g.get("repeatPassword").value
      ? null
      : { mismatch: true };
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
