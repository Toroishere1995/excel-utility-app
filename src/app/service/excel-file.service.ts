import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelFileService {

  constructor(private apiService:ApiService) { }

  uploadFiles(files: string []): Observable<{data:any}> {
   // console.log(files);
    const formData = new FormData();
    
    for (var i = 0; i < files.length; i++) { 
      formData.append("files", files[i]);
     // console.log(files[i]);
    }
    return this.apiService.post('/uploadFiles',formData);
  }
 
}
