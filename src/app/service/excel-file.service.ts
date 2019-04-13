import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelFileService {

  constructor(private apiService:ApiService) { }

  uploadFiles(files: string []): Observable<any> {
   // console.log(files);
    const formData = new FormData();
    
    for (var i = 0; i < files.length; i++) { 
      formData.append("files", files[i]);
     // console.log(files[i]);
    }
    return this.apiService.post('/uploadFiles',formData);
  }
 
  downloadMergedFile(columnHeadingString:string,file1id,file2id): Observable<any>{
    //var body = {'zzzz'};
    const body=columnHeadingString.split(",");
    const urlParam='?file1Id='+file1id+'&file2Id='+file2id;
    return this.apiService.postForDownload('/downloadFile'+urlParam,body);
  }
}
