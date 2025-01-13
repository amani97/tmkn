import { Injectable } from '@angular/core';

@Injectable()
export abstract class INavigationManagerService {
	history!: string[];
	abstract init(): void;
	abstract navigate(url: string): void;
	abstract navigateBack(): void;
	abstract navigateAfterRedirect(): void;
	abstract getCurrentUrl(): string;
}
