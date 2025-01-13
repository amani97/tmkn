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
import { ILoaderFacade } from '../abstracts/facades';
import { CoreConfig } from '../models/dtos';
import { CORE_CONFIG } from '../models/tokens';
import { GResult } from '../models/api-results';
import { isOfType } from '@tmkn/utilities';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private loaderFacade: ILoaderFacade,
    @Inject(CORE_CONFIG) private coreConfig: CoreConfig
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method.toLowerCase() == 'post' || request.method.toLowerCase() == 'put') {
      if (!request.url.includes(this.coreConfig.baseAPI)) {
        this.loaderFacade.Show();
      }
    }

    if (Object.prototype.hasOwnProperty.call(request, 'body') && !request.body) {
      request = request.clone({
        body: {},
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<unknown>) => {
        if (
          event.constructor === HttpResponse &&
          event instanceof HttpResponse &&
          isOfType<GResult<unknown>>(event.body)
        ) {
          if (request.method.toLowerCase() == 'post') {
            event = event.clone({ body: event.body.value });
          } else {
            this.loaderFacade.Hide();
            event = event.clone({ body: event.body.value });
          }
        }
        return event;
      })
    );
  }
}
