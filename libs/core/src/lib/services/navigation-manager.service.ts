import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { INavigationManagerService } from '../abstracts/services';
import { filter } from 'rxjs/operators';
import { IStorageFacade } from '../abstracts/facades';

@Injectable()
export class NavigationManagerService implements INavigationManagerService {
	history: string[] = [];

	constructor(private router: Router, private storageFacade: IStorageFacade) {}

	init(): void {
		this.router.events
			.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				if (event.urlAfterRedirects.includes('auth-callback#access_token')) {
					const localHistory = this.storageFacade.getItemByKey('history') as string[];
					this.history = [...this.history].concat(localHistory);
				} else {
					if (event.urlAfterRedirects !== this.history[this.history.length - 1]) {
						this.history = [...this.history, event.urlAfterRedirects];
					}
				}

				if (this.history.length !== 1) {
					this.storageFacade.setItem('history', this.history);
				}
			});
	}

	navigate(url: string): void {
		this.router.navigateByUrl(url);
	}

	navigateBack(): void {
		const tempHistory: string[] = this.storageFacade.getItemByKey('history');
		if (tempHistory.length > 1) {
			tempHistory.pop();
			const previousUrl = tempHistory[tempHistory.length - 1];
			this.navigate(previousUrl);
		} else {
			// Navigate to the default route or a specific fallback route
			this.navigate('./');
		}
	}

	navigateAfterRedirect(): void {
		const tempHistory: string[] = this.storageFacade.getItemByKey('history');
		if (tempHistory.length > 1) {
			const previousUrl = tempHistory[tempHistory.length - 1];
			this.navigate(previousUrl);
		} else {
			// Navigate to the default route or a specific fallback route
			this.navigate('./');
		}
	}

	getCurrentUrl(): string {
		return this.history.length > 0 ? this.history[this.history.length - 1] : '/';
	}
}
