import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from 'src/app/_interface/pagination';
import { Message } from 'src/app/_interface/message';
import { UserService } from 'src/app/shared/Services/user.service';
import { AuthService } from 'src/app/shared/Services/Auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/shared/Services/Alerts.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[]
  pagination: Pagination;
  messageContainer = 'Unread';


  constructor(private userService: UserService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private alertService: AlertsService) { }

  ngOnInit() {
      this.route.data.subscribe(data => {
        this.messages = data.messages.result;
        this.pagination = data.messages.pagination;
      });
  }

  loadMessages(){
      this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, 
        this.pagination.itemsPerPage, this.messageContainer).subscribe((res: PaginatedResult<Message[]>) => {

            this.messages = res.result;
            this.pagination = res.pagination;
        }, error =>{
          this.alertService.error(error);
        })
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessages(id: number){
    this.alertService.confirm('¿Desea eliminar este mensaje?', () => {
        this.userService.deleteMessages(id, this.authService.decodedToken.nameid)
          .subscribe(data =>{
              this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
              this.alertService.success('Mensaje eliminado correctamente');
          });

    })
  
  }

}
