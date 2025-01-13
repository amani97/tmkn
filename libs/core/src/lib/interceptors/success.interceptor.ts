import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IToastFacade } from '../abstracts/facades';
import { isOfType } from '@tmkn/utilities';
import { GResult } from '../models/api-results';
import { TM_HTTP_NOTIFICATION_MESSAGES, TM_NOTIFICATION_MESSAGES } from '../models/tokens';

@Injectable()
export class SuccessMessageInterceptor implements HttpInterceptor {
  constructor(
    private toastFacade: IToastFacade,
    @Inject(TM_NOTIFICATION_MESSAGES) private notificationMessages: any,
    @Inject(TM_HTTP_NOTIFICATION_MESSAGES) private httpNotificationMessages: { [key: string]: string }
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<unknown>) => {
        if (
          event.constructor === HttpResponse &&
          event instanceof HttpResponse &&
          isOfType<GResult<unknown>>(event.body)
        ) {
          if (request.method.toLowerCase() !== 'get') {
            const urlParts = request.url.split('/');
            const lastUrlPart = urlParts[urlParts.length - 1];

            if (Object.prototype.hasOwnProperty.call(this.httpNotificationMessages, lastUrlPart)) {
              const message = this.httpNotificationMessages[lastUrlPart];
              this.toastFacade.Open(message, 'success', true);
            } else {
              this.toastFacade.Open(this.notificationMessages.success, 'success', true);
            }
          }
        }
        return event;
      })
    );
  }
}
