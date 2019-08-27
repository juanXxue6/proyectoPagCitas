import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { UserService } from '../Services/user.service';
import { AlertsService } from '../Services/Alerts.service';
import { Message } from 'src/app/_interface/message';
import { faClock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};
  faClock = faClock;
  faPaperPlane = faPaperPlane;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertsService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(messages => {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < messages.length; i++) {
            if (
              messages[i].isRead === false &&
              messages[i].recipientId === currentUserId
            ) {
              this.userService.readMessage(currentUserId, messages[i].id);
            }
          }
        })
      )

      .subscribe(
        data => {
          this.messages = data;
          console.log(this.messages);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          this.messages.unshift(message);
          this.newMessage.content = '';
          this.loadMessages();
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
