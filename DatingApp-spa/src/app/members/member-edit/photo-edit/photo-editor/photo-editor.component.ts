import { Component, OnInit, Input } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/shared/Services/Auth.service";
import {
  faUpload,
  faImage,
  faTrashAlt,
  faBan,
  faFileUpload
} from "@fortawesome/free-solid-svg-icons";
import { Photo } from "src/app/_interface/Photo";
import { UserService } from "src/app/shared/Services/user.service";
import { AlertsService } from "src/app/shared/Services/Alerts.service";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.css"]
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  public uploader: FileUploader;

  // tslint:disable-next-line: no-inferrable-types
  public hasBaseDropZoneOver: boolean = false;
  baseUrl = environment.apiUrl;
  faUpload = faUpload;
  faImage = faImage;
  faTrash = faTrashAlt;
  faBan = faBan;
  faFileUp = faFileUpload;

  constructor(
    private authService: AuthService,
    private alertService: AlertsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initialeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initialeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        "users/" +
        this.authService.decodedToken.nameid +
        "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onBeforeUploadItem = item => {
      item.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }











}
