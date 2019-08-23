import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_interface/user';
import { faFireAlt, faUserAlt, faCheck, faUserCircle, faHeart, faEnvelope, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/shared/Services/user.service';
import { AlertsService } from 'src/app/shared/Services/Alerts.service';
import { AuthService } from 'src/app/shared/Services/Auth.service';
import { PaginatedResult } from 'src/app/_interface/pagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userCard',
  templateUrl: './userCard.component.html',
  styleUrls: ['./userCard.component.css']
})
export class userCardComponent implements OnInit {

@Input() user: User;
users: User[];
faFireAlt = faFireAlt;
faUserAlt = faUserAlt;
faCheck = faCheck;
faUserCircle = faUserCircle;
faHeart = faHeart;
faEnvelope = faEnvelope;
faHeartBroken = faHeartBroken;


likesParam: string;

  constructor(private userService: UserService,
              private authService: AuthService,
              private alertify: AlertsService,
              private route: ActivatedRoute) { }

  ngOnInit() {


  }

  sendLike(id: number ){

        this.userService.sendLike(this.authService.decodedToken.nameid, id)
        .subscribe(data =>{
          this.alertify.success("Has dado me gusta a " + this.user.knowAs);
        }, error =>{
            this.alertify.error(error);
        });

  }


}
