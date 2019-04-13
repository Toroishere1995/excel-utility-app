import { Component, OnInit } from '@angular/core';
import {IUploadResponse} from './model/IUploadResponse.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'utility-app';
  constructor() { }
  ngOnInit() {

  }
  uploadedResponse: IUploadResponse[] = [];
  childEventResponse(event){
    this.uploadedResponse = event;
    console.log(this.uploadedResponse);
  }
}
