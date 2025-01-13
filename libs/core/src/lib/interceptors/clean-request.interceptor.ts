import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CleanRequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.body) {
      const cleanedBody = this.removeNullValues(request.body);
      const clonedRequest = request.clone({ body: cleanedBody });
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }

  private removeNullValues<T>(obj: T): T {
    if (Array.isArray(obj)) {
      return obj.map(item => this.removeNullValues(item)) as T;
    } else if (obj !== null && typeof obj === 'object') {
      Object.fromEntries(
        Object.entries(obj as Record<string, unknown>)
          .filter(([_, value]) => !!value)
          .map(([key, value]) => [key, this.removeNullValues(value)])
      ) as T;
    }
    return obj;
  }
}
