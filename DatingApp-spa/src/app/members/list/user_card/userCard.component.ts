import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_interface/user';
import { faFireAlt, faUserAlt, faCheck, faUserCircle, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-userCard',
  templateUrl: './userCard.component.html',
  styleUrls: ['./userCard.component.css']
})
export class userCardComponent implements OnInit {

@Input() user: User[];
faFireAlt = faFireAlt;
faUserAlt = faUserAlt;
faCheck = faCheck;
faUserCircle = faUserCircle;
faHeart = faHeart;
faEnvelope = faEnvelope

  constructor() { }

  ngOnInit() {
  }

}
