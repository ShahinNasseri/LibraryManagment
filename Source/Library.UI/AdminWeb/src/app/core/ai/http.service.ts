import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public apiUrl: string = '';

  constructor(private readonly http: HttpClient) {
    this.apiUrl = 'http://localhost:8000/';
  }

  post<T>(url: string, data?: any, showLoading = false): Observable<ApiResponse<T>> {
    // if (showLoading)
    //   this.loadingService.changeState(showLoading);


    return this.http.post<ApiResponse<T>>(this.apiUrl + url, data).pipe(finalize(() => {
      // if (showLoading)
      //   this.loadingService.changeState(false);
    }));
  }

  rawPost<T>(url: string, data?: any, showLoading = false): Observable<any> {
    // if (showLoading)
    //   this.loadingService.changeState(showLoading);


    return this.http.post<T>(this.apiUrl + url, data).pipe(finalize(() => {
      // if (showLoading)
      //   this.loadingService.changeState(false);
    }));
  }

  get<T>(url: string, showLoading = false): Observable<ApiResponse<T>> {
    // if (showLoading)
    //   this.loadingService.changeState(showLoading);

    return this.http.get<ApiResponse<T>>(this.apiUrl + url).pipe(finalize(() => {
      // if (showLoading)
      //   this.loadingService.changeState(false);
    }));
  }

  rawGet<T>(url: string, showLoading = false): Observable<any> {
    // if (showLoading)
    //   this.loadingService.changeState(showLoading);

    return this.http.get<T>(this.apiUrl + url).pipe(finalize(() => {
      // if (showLoading)
      //   this.loadingService.changeState(false);
    }));
  }

}


export class ApiResponse<T> {
  constructor(public data?: T, public errors?: any, public statusCode?: any) {
    this.data = data;
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

