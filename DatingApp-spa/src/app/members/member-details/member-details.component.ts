import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/Services/user.service';
import { AlertsService } from 'src/app/shared/Services/Alerts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_interface/user';
// tslint:disable-next-line: max-line-length
import { faUserCircle, faMapMarkedAlt, faVenusMars, faCalendarAlt, faClock, faBirthdayCake, faHeart, faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  // tslint:disable-next-line: no-inferrable-types
  loadSpinner: boolean = false;

  faUserCircle = faUserCircle;
  faCake = faBirthdayCake;
  faMap = faMapMarkedAlt;
  faGender = faVenusMars;
  faCalendar = faCalendarAlt;
  faClock = faClock;
  faHeart = faHeart;
  faEnvelope = faEnvelope;
  faArrowLeft = faArrowLeft;


  constructor(
    private userService: UserService,
    private AlertService: AlertsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.loadSpinner = true;

    this.userService.getUser(+this.route.snapshot.params.id).subscribe(
      (user: User) => {
        this.user = user;
        this.loadSpinner = false;
      },
      error => {
        this.AlertService.error(error);
      }
    );
  }


  back() {

    this.router.navigate(['/list']);
  }


}
