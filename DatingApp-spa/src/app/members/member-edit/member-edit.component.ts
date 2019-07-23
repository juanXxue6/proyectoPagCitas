import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interface/user';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faUserCircle,
  faBirthdayCake,
  faMapMarkedAlt,
  faVenusMars,
  faCalendarAlt,
  faClock,
  faHeart,
  faEnvelope,
  faArrowLeft,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/shared/Services/user.service';
import { AlertsService } from 'src/app/shared/Services/Alerts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/Services/Auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  photoUrl: string;
  formularioEditar: FormGroup;

  faUserCircle = faUserCircle;
  faCake = faBirthdayCake;
  faMap = faMapMarkedAlt;
  faGender = faVenusMars;
  faCalendar = faCalendarAlt;
  faClock = faClock;
  faHeart = faHeart;
  faEnvelope = faEnvelope;
  faArrowLeft = faArrowLeft;
  faChevronUp = faChevronUp;

  constructor(
    private userService: UserService,
    private AlertService: AlertsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  
  ) {}

  ngOnInit() {

    this.formularioEditar = new FormGroup({

      knowAs: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      introduction: new FormControl(null, Validators.required),
      lookingFor: new FormControl(null, Validators.required),
      interests: new FormControl(null)
    });




    this.route.data.subscribe(data => {
      this.user = data.user;
      this.chargeValues();
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl)


  }

  onSubmit() {
   
    this.newValues();

    this.userService.updateUser(this.user.id, this.user)
    .subscribe(next => {
     
      this.AlertService.success('Perfil actualizado correctamente');
      this.formularioEditar.reset(this.user)

    }, error =>{
      console.log(error)
      this.AlertService.error(error)
    })

    
  }

  chargeValues() {

    this.formularioEditar.patchValue({

      knowAs: this.user.knowAs,
      city: this.user.city,
      country: this.user.country,
      introduction: this.user.introduction,
      lookingFor: this.user.lookingFor,
      interests: this.user.interests
    });
  }



  newValues() {
    this.user.knowAs = this.formularioEditar.value.knowAs;
    this.user.city = this.formularioEditar.value.city;
    this.user.country = this.formularioEditar.value.country;
    this.user.introduction = this.formularioEditar.value.introduction;
    this.user.lookingFor = this.formularioEditar.value.lookingFor;
    this.user.interests = this.formularioEditar.value.interests;

  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
