import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_interface/Photo';
import {
  faChevronUp, faTrash
} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  @Input() photos: Photo[];

faChevronUp = faChevronUp;
faTrash = faTrash;

  constructor() { }

  ngOnInit() {
  }

}
