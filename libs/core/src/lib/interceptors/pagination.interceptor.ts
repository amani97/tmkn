import { Pagination } from '@tmkn/ui';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaginationInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<unknown>) => {
        if (event.constructor === HttpResponse && event instanceof HttpResponse) {
          if (request.method.toLowerCase() == 'get') {
            const paginationHeader = event.headers.get('X-Pagination');
            if (paginationHeader) {
              const paginationMetadata = JSON.parse(paginationHeader);
              const pagination: Pagination = new Pagination(paginationMetadata.pageSize);
              pagination.hasNext = paginationMetadata.hasNext;
              pagination.hasPrevious = paginationMetadata.hasPrevious;
              pagination.pageIndex = paginationMetadata.pageIndex;
              pagination.totalCount = paginationMetadata.totalCount;
              pagination.totalPages = paginationMetadata.totalPages;
              event = event.clone({
                body: {
                  data: event.body,
                  pagination,
                },
              });
            }
          }
        }
        return event;
      })
    );
  }
}
