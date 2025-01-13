import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ILoaderFacade, IStorageFacade } from '@tmkn/core';
import { IAuthenticationFacade } from '../abstracts/facades';
import { IAuthenticationAPIService } from '../abstracts/services';
import { AuthConst } from '../settings/auth-const.setting';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

	constructor(
		private loaderFacade: ILoaderFacade,
		private router: Router,
		private authenticationFacade: IAuthenticationFacade,
		private authenticationAPIService: IAuthenticationAPIService,
		private storageFacade: IStorageFacade,
	) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					return this.handle401Error(request, next);
				}
				return throwError(() => error);
			}),
		);
	}

	private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);

			return this.authenticationAPIService.refreshToken().pipe(
				switchMap((tokens) => {
					if (tokens) {
						this.authenticationFacade.storeRefreshTokens(tokens);
						const newAccessToken = this.storageFacade.getItemByKey(AuthConst.AccessToken) as string;
						this.refreshTokenSubject.next(newAccessToken);

						return next.handle(
							request.clone({
								setHeaders: { Authorization: `Bearer ${newAccessToken}` },
							}),
						);
					}
					throw new Error('Refresh token failed');
				}),
				catchError(() => {
					this.authenticationFacade.logout();
					this.router.navigate(['/login']);
					return throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' }));
				}),
				finalize(() => {
					this.isRefreshing = false;
				}),
			);
		} else {
			return this.refreshTokenSubject.pipe(
				filter((token) => token !== null),
				take(1),
				switchMap((token) => {
					return next.handle(
						request.clone({
							setHeaders: { Authorization: `Bearer ${token}` },
						}),
					);
				}),
			);
		}
	}
}
