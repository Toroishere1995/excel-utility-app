import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ExcelFileService } from '../service/excel-file.service';
import { IUploadResponse } from '../model/IUploadResponse.model';

const URL = 'http://localhost:8080/api/v1/uploadFiles';

@Component({

  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  title = 'Upload Multiple Files';

  constructor(private excelFileService: ExcelFileService) { }

  files: string[] = [];
  uploadedResponse: IUploadResponse[] = [];
  status: string;
  code: string;
  message: string;
  showMessage: boolean = false;

  disableUpload: boolean = true;

  @Output() responseEvent = new EventEmitter<IUploadResponse[]>();

  ngOnInit() { }

  getFileDetails(event) {
    let numberOfFiles = event.target.files.length;
    if (numberOfFiles != 2) {
      this.showMessage = true;
      this.message = 'Two files for upload.';
      this.disableUpload = true;
    }
    else if (numberOfFiles == 2) {
      this.disableUpload = false;
      this.showMessage = false;
      this.message = '';
      // if((this.files.length>=2) || ((this.files.length+numberOfFiles)>2)){
      //   this.files.splice(0,this.files.length);
      // }
      this.files.splice(0, this.files.length);
      for (var i = 0; i < event.target.files.length; i++) {

        if (this.fileIsValid(event.target.files[i]) === true) {
          this.files.push(event.target.files[i]);
        } else {

          this.showMessage = true;
          this.disableUpload = true;
        }
      }


    }
  }

  uploadFiles() {
    this.disableUpload = false;
    this.excelFileService.uploadFiles(this.files).subscribe(
      res => {
        // console.log(res);
        this.uploadedResponse = res.result;
        this.status = res.status;
        this.code = res.code;
        this.message = res.message;
        if (this.code === '201') {
          this.responseEvent.emit(this.uploadedResponse);
          console.log(this.uploadedResponse);
        }
      },
      err => {
        this.message=err['message'];
        this.showMessage=true;
      }
    );
  }

  fileIsValid(file: File) {
    if (file['size'] == 0) {
      this.message = "One of the files is empty";
      return false;
    }
    let filename: string = file['name'];
    let body = filename.split('.');
    if (body.length <= 1 && body.length > 2) {
      this.message = "Not a valid file name";
      return false;
    }

    if (!(body[1] === "xls" || body[1] === "xlsx")) {
      this.message = "Not an Excel file";
      return false;
    }
    return true;
  }
}