import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse, 
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { AlertService, AlertType } from '@core/general/services/alert.service';
import { ApiResponse } from '@core/general/models/api-response.model';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private readonly alertService: AlertService) {}

  // The intercept method to handle the HTTP request and response
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Handle the request by using the next handler in the chain
    return next.handle(request).pipe(
      // Modify the response using the map operator
      map((event: HttpEvent<any>) => {
        // If the response is successful (HTTP 200) but contains a specific error condition
        if (event instanceof HttpResponse && event.status === 200) {
          if (event.body && event.body.isSuccess === false) {
            // Create a new error response with a custom status code and message
            const modifiedResponse = new HttpErrorResponse({
              error: event.body,
              headers: event.headers,
              status: 400,
              statusText: 'custom error handler',
              url: event.url ?? undefined,
            });
            // Throw the custom error
            throw new CustomError(modifiedResponse);
          }
        }
        return event;
      }),
      // Handle errors using the catchError operator
      catchError((error: HttpErrorResponse) => {
        // Check if error alerts should be skipped
        const ignoreAlert = request.headers.get('skip-error-handler');
        const showError = ignoreAlert == 'false';

        // Handle custom errors specifically
        if (error instanceof CustomError) {
          if (showError) {
            this.alertService.alert(
              AlertType.error,
              error.errorObject.error.message
            );
          }
          return throwError(() => error.errorObject);
        }

        // Generic error handlers for various error conditions
        if (this.isInternalError(error)) {
          if(showError){
            this.alertService.alert(
              AlertType.error,
              'Connection to the server has failed, please contact support'
            );
          }
          return throwError(() => error);
        }

        if (this.isUnAuthorizeRequest(error)) {
          return throwError(() => error);
        }

        if (this.isCustomServerError(error)) {
          const res = error.error as ApiResponse<null>;
          const errorMessage = res.errors != null ? res.errors[0] : 'there is an error';
          if(showError){
            this.alertService.notify(
              AlertType.error,
              errorMessage,
              'Processing request'
            );
          }
          return throwError(() => error);
        }

        if (this.isServerIsOutOfAccess(error)) {
          if(showError){
            this.alertService.alert(
              AlertType.error,
              'The server is not available, please try again later'
            );
          }
          return throwError(() => error);
        }

        return throwError(() => error);
      })
    );
  }

  // Helper methods to determine the type of HTTP error
  private isUnAuthorizeRequest(error: HttpErrorResponse): boolean {
    return error.status == 401 || error.status == 403;
  }

  private isServerIsOutOfAccess(error: HttpErrorResponse): boolean {
    return error.status == 0;
  }

  private isCustomServerError(error: HttpErrorResponse): boolean {
    return error.status >= 400 && error.status < 500;
  }

  private isInternalError(error: HttpErrorResponse): boolean {
    return error.status >= 500;
  }
}

// Custom error class to wrap error objects
class CustomError extends Error {
  constructor(public errorObject: any) {
    super();
  }
}
