import { Component, ElementRef, OnInit, ViewChild ,Output, EventEmitter} from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { ExcelFileService } from '../service/excel-file.service';
import { IUploadResponse } from '../model/IUploadResponse.model';

const URL = 'http://localhost:8080/api/v1/uploadFiles';

@Component({

  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  title = 'Upload Multiple Files in Angular 4';

  constructor (private excelFileService:ExcelFileService) {  }

  files:string [] = [];
  uploadedResponse: IUploadResponse[] = [];
  status:string ;
  code:string;
  message: string;

  @Output() responseEvent = new EventEmitter<IUploadResponse[]>();

  ngOnInit () {  }

  getFileDetails (event) {

    for (var i = 0; i < event.target.files.length; i++) { 
      this.files.push(event.target.files[i]);
    }
    console.log(this.files);
  }

  uploadFiles () {
    this.excelFileService.uploadFiles(this.files).subscribe(
      res=> {
       // console.log(res);
        this.uploadedResponse = res.result;
        this.status=res.status;
        this.code=res.code;
        this.message=res.message;
        if(this.code === '201'){
          this.responseEvent.emit(this.uploadedResponse);
          console.log(this.uploadedResponse);
        }
      }
    );
  }
}