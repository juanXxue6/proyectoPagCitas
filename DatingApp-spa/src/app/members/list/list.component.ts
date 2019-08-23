import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/Services/user.service";
import { User } from "src/app/_interface/user";
import { AlertsService } from "src/app/shared/Services/Alerts.service";
import { ActivatedRoute } from "@angular/router";
import { Pagination, PaginatedResult } from "src/app/_interface/pagination";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  public users: User[];
  user: User = JSON.parse(localStorage.getItem("user"));
  genderList = [
    { value: "female", display: "Mujeres" },
    { value: "male", display: "Hombres" }
  ];
  userParams: any = {};
  page: number;
  pagination: Pagination;

  constructor(
    private userService: UserService,
    private alertService: AlertsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });

    this.userParams.gender = this.user.gender === "male" ? "female" : "male";
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = "lastActive";
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUser();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === "male" ? "female" : "male";
    this.userParams.minAge = 18;
    this.userParams.max = 99;
    this.loadUser();
  }

  loadUser() {
    console.log(this.userParams);

    this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
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
