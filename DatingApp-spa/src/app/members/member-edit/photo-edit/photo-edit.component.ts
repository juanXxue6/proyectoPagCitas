import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Photo } from "src/app/_interface/Photo";
import { faChevronUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/shared/Services/Auth.service";
import { AlertsService } from "src/app/shared/Services/Alerts.service";
import { UserService } from "src/app/shared/Services/user.service";

@Component({
  selector: "app-photo-edit",
  templateUrl: "./photo-edit.component.html",
  styleUrls: ["./photo-edit.component.css"]
})
export class PhotoEditComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  private currentMain;

  faChevronUp = faChevronUp;
  faTrash = faTrash;

  constructor(
    private authService: AuthService,
    private alertService: AlertsService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  setMainPhoto(photo: Photo) {
    this.userService
      .SetMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.currentMain = this.photos.filter(p => p.isMain === true)[0];
          this.currentMain.isMain = false;
          photo.isMain = true;
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            "user",
            JSON.stringify(this.authService.currentUser)
          );

          setTimeout(() => {
            this.alertService.success(
              "Foto de perfil actualizada correctamente"
            );
          }, 0);
        },
        error => {
          this.alertService.warning(error);
        }
      );
  }

  deletePhoto(id: number) {
    this.alertService.confirm("¿Desea eliminar la foto?", () => {
      this.userService
        .DeletePhoto(this.authService.decodedToken.nameid, id)
        .subscribe(() => {
          this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
          this.alertService.success("Foto eliminada correctamente");
        }, error =>{
          this.alertService.error('Error al borrar la foto')
        });
    });
  }
}
