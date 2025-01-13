import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoaderFacade, IStorageFacade } from '@tmkn/core';
import { AuthConst } from '../settings/auth-const.setting';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
	constructor(private storageFacade: IStorageFacade, private loaderFacade: ILoaderFacade) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (this.storageFacade.getItemByKey(AuthConst.AccessToken)) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${this.storageFacade.getItemByKey(AuthConst.AccessToken)}`,
				},
			});
		}

		return next.handle(request);
	}
}
