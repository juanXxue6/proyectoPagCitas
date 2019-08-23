import { Component, OnInit, Input } from '@angular/core';
import { Pagination, PaginatedResult } from 'src/app/_interface/pagination';
import { User } from 'src/app/_interface/user';
import { AuthService } from 'src/app/shared/Services/Auth.service';
import { UserService } from 'src/app/shared/Services/user.service';

import { ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/shared/Services/Alerts.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

    users: User[];
    pagination: Pagination;
    likesParam: string;


  constructor(private authService: AuthService,
              private userService: UserService,
              private alertService: AlertsService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
    this.likesParam = 'Likees';
    this.loadUser();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUser();
  }


  loadUser() {
  
    this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        null,
        this.likesParam
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

}
