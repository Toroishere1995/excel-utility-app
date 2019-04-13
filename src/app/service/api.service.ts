import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  private parseErrorBlob(err: HttpErrorResponse): Observable<any> {
    const reader: FileReader = new FileReader();

    const obs = Observable.create((observer: any) => {
      reader.onloadend = (e) => {
        observer.error(JSON.parse(reader.result));
        observer.complete();
      }
    });
    reader.readAsText(err.error);
    return obs;
  }
  
  post(path: string, body): Observable<any> {
    // console.log(body)
    return this.http.post(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    console.log(`${environment.api_url}${path}`);
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  postForDownload(path: string, body): Observable<any> {
    // console.log(body)
    return this.http.post(
      `${environment.api_url}${path}`,
      body, { responseType: 'blob' as 'json'}
    ).pipe(catchError(this.parseErrorBlob));
  }

}
