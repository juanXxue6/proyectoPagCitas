import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/Services/user.service";
import { User } from "src/app/_interface/user";
import { AlertsService } from "src/app/shared/Services/Alerts.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  public users: User[];

  constructor(
    private userService: UserService,
    private alertService: AlertsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users;
    });
  }

  loadUser() {
    this.userService.getUsers().subscribe(
      (usersData: User[]) => {
        this.users = usersData;
        console.log(this.users);
      },
      error => {
        this.alertService.error(error);
      }
    );
  }
}
