import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faBiohazard } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {

  values;

  activate: boolean = false;
  faBiohazard = faBiohazard;

  constructor(private http: HttpClient) { }

ngOnInit() {


}

showValues(){

  this.http.get('http://localhost:5000/api/values')
  .subscribe(sub => {
    this.values = sub;

  }, error =>{
    console.log(error);
  });

  this.activate = true;


}




}
