import { Component, OnInit } from '@angular/core';
import { faWrench, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  faWrench = faWrench
  faArrowUp = faArrowUp

  constructor() { }

  ngOnInit() {
  }

}
