import { Component, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/shared/Services/user.service';
import { AlertsService } from 'src/app/shared/Services/Alerts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_interface/user';

// tslint:disable-next-line: max-line-length
import { faUserCircle, faMapMarkedAlt, faVenusMars, faCalendarAlt, faClock, faBirthdayCake, faHeart, faEnvelope, faArrowLeft, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/Services/Auth.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  @Output() user: User;


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
  faHeartBroken = faHeartBroken;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private AlertService: AlertsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.user = data['user']
    })


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


  sendLike(id: number){

    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data =>{
      this.AlertService.success("Has dado me gusta a " + this.user.knowAs);
    }, error =>{
        this.AlertService.error(error);
    });


  }


  sendDislike(id: number){

    this.AlertService.confirm("¿Seguro que quieres borrar el like al usuario?", () => {
      this.userService.sendDislike(this.authService.decodedToken.nameid, id)
      .subscribe(data =>{
          this.AlertService.success("Has quitado el like correctamente a " + this.user.knowAs);
      }, error =>{
        this.AlertService.error(error);
      })

    });

    this.loadUser();
  }



}
