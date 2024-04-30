import {
    HttpClient,
    HttpEvent,
    HttpEventType,
    HttpHeaders,
    HttpParams,
    HttpRequest,
    HttpResponse,
  } from '@angular/common/http';
  import { Inject, Injectable, InjectionToken, inject } from '@angular/core';
  import { Observable, filter, map } from 'rxjs';

  
  @Injectable({
    providedIn: 'root',
  })
  export class ApiBaseService {
    constructor(private http: HttpClient) {
    }
  
    public get<T>(
      api: string,
      skipGlobalHandler: boolean = false
    ): Observable<T> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/octet-stream',
          'Cache-Control': 'No-Cache',
          'Skip-Error-Handler': JSON.stringify(skipGlobalHandler),
        }),
      };
  
      return this.http.get<T>(api, httpOptions);
    }
  
    public getWithParams<T>(
      api: string,
      params: any,
      skipGlobalHandler: boolean = false
    ): Observable<T> {
      const queryParams = new HttpParams({ fromObject: params });
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/octet-stream',
          'Cache-Control': 'No-Cache',
          'Skip-Error-Handler': JSON.stringify(skipGlobalHandler),
        }),
        params: queryParams,
      };
      return this.http.get<T>(api, httpOptions);
    }
  
    public post<T>(
      api: string,
      body: any = null,
      skipGlobalHandler: boolean = false
    ): Observable<T> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Skip-Error-Handler': JSON.stringify(skipGlobalHandler),
        }),
      };
      return this.http.post<T>(api, body, httpOptions);
    }
  
    public put<T>(
      api: string,
      body: any = null,
      skipGlobalHandler: boolean = false
    ): Observable<T> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Skip-Error-Handler': JSON.stringify(skipGlobalHandler),
        }),
      };
      return this.http.put<T>(api, body, httpOptions);
    }
  
    public delete<T>(
      api: string,
      skipGlobalHandler: boolean = false
    ): Observable<T> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Skip-Error-Handler': JSON.stringify(skipGlobalHandler),
        }),
      };
      return this.http.delete<T>(api, httpOptions);
    }
  
    public postFormData<T>(
      api: string,
      body: FormData,
      skipGlobalHandler: boolean = false
    ): Observable<number | T> {
      const httpOptions: any = {
        headers: new HttpHeaders({
          'Skip-Error-Handler': JSON.stringify(skipGlobalHandler),
        }),
        reportProgress: true,
        observe: 'events',
      };
  
      return this.http.post(api, body, httpOptions).pipe(
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        map((event: any): number | any => {
          if (event.type === HttpEventType.UploadProgress) {
            return Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            return event.body as T;
          }
        }),
        filter(
          (result: number | T | undefined): result is number | T =>
            result !== undefined
        )
      );
    }
  
    public putFormData<T>(
      api: string,
      body: FormData,
      skipGlobalHandler: boolean = false
    ): Observable<number | T> {
      const httpOptions: any = {
        headers: new HttpHeaders({
          'Skip-Error-Handler': JSON.stringify(skipGlobalHandler),
        }),
        reportProgress: true,
        observe: 'events',
      };
  
      return this.http.put(api, body, httpOptions).pipe(
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        map((event: any): number | any => {
          if (event.type === HttpEventType.UploadProgress) {
            return Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            return event.body as T;
          }
        }),
        filter(
          (result: number | T | undefined): result is number | T =>
            result !== undefined
        )
      );
    }
  
    public getFile<T>(
      api: string,
      skipGlobalHandler: boolean = false
    ): Observable<number | HttpResponse<T> | undefined> {
      const httpOptions: any = {
        headers: new HttpHeaders({
          'Content-Type': 'application/octet-stream',
          'Skip-Error-Handler': JSON.stringify(skipGlobalHandler),
        }),
        reportProgress: true,
        observe: 'events',
        responseType: 'blob',
      };
  
      return this.http
        .request<T>(new HttpRequest<T>('GET', api, httpOptions))
        .pipe(
          map((event: HttpEvent<T>) => {
            if (event.type === HttpEventType.DownloadProgress) {
              return Math.round((100 * event.loaded) / event.total!);
            } else if (event.type === HttpEventType.Response) {
              return event;
            }
            return undefined;
          })
        );
    }
  }
  