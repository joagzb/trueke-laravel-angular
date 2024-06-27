import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const contextData: string = `
        url requested: ${request.url}\n
        urlParams: ${request.params}\n
        body: ${request.body}
        `;
      let errorMessage = 'An error occurred';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `
          Error: ${error.error.message}\n
          Status: ${error.status}:${error.statusText}\n
          URL:${error.url}\n
          context: \n${contextData}
        `;
      } else {
        // Server-side error
        errorMessage = `
          Message: ${error.message}\n
          Status: ${error.status}:${error.statusText}\n
          URL:${error.url}\n
          context: \n${contextData}
        `;
      }
      // Handle the error as desired (e.g., show an alert, log, etc.)
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
