import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILoaderFacade, IToastFacade } from '../abstracts/facades';
import { TM_NOTIFICATION_MESSAGES } from '../models/tokens';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastFacade: IToastFacade,
    private loaderFacade: ILoaderFacade,
    @Inject(TM_NOTIFICATION_MESSAGES) private notificationMessages: any
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(errorResponse => {
        this.loaderFacade.Hide();
        if (errorResponse.status === 0) {
          return throwError(() => new Error(`The API request ${errorResponse?.url} is not valid`));
        } else {
          this._errorsHandler(errorResponse.error.errors);
          return throwError(() => new HttpErrorResponse(errorResponse));
        }
      })
    );
  }

  openMessage(message: string) {
    this.toastFacade.Open(message, 'error', true);
  }

  private _errorsHandler(errors: unknown) {
    if (Array.isArray(errors)) {
      const errorMessage = this.notificationMessages[errors[0].code];
      if (errorMessage) {
        if (typeof errorMessage === 'function') {
          this.openMessage(errorMessage(errors[0].description));
        } else {
          // ? In Case of Client Side Message Error
          this.openMessage(this.notificationMessages[errors[0].code]);
        }
      } else {
        // ? In Case of Server Side Message Error
        this.openMessage(errors[0].description);
      }
    } else if (typeof errors === 'object') {
      // eslint-disable-next-line no-prototype-builtins
      if (errors && errors.hasOwnProperty('command')) {
        let messageError = '';
        for (const key in errors) {
          if (Object.prototype.hasOwnProperty.call(errors, key)) {
            if (key.includes('$.')) {
              const fieldName = this.extractFieldName(key); // Extract field name from key
              messageError = `The ${fieldName} is required`;
              break; // Stop iteration once a property with '$.' is found
            }
          }
        }
        this.openMessage(messageError);
      } else {
        let messageError = '';
        for (const key in errors) {
          if (Object.prototype.hasOwnProperty.call(errors, key)) {
            const fieldName = this.extractFieldName(key); // Extract field name from key
            messageError = `The ${fieldName} is required`;
            break; // Stop iteration once a property is found
          }
        }
        this.openMessage(messageError);
      }
    }
  }

  extractFieldName(key: string): string {
    // Split the key by dot (.)
    const parts = key.split('.');
    // Return the last part as the field name
    return parts[parts.length - 1];
  }
}
