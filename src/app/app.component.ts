import { Component, OnInit } from '@angular/core';
import {IUploadResponse} from './model/IUploadResponse.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'utility-app';

  showDownloadComponent:boolean = false;
  constructor() { }
  ngOnInit() {

  }
  uploadedResponse: IUploadResponse[] = [];
  childEventResponse(event){
    this.uploadedResponse = event;
    this.showDownloadComponent=true;
    console.log(this.uploadedResponse);
  }
}
