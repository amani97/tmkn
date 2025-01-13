import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationState } from '../../model/states';
import { LoginResponse } from '../../model/dtos';
import { UserType } from '../../model/enums';
import { RefreshTokenCommand } from '../../model/commands';

const initState: AuthenticationState = {
	idTokenClaims: null,
	isAuthenticated: false,
	isLoading: false,
};
@Injectable()
export abstract class IAuthenticationFacade {
	protected store = new BehaviorSubject<AuthenticationState>(initState);
	protected state$ = this.store.asObservable();

	abstract get redirectUrl(): string;
	abstract set redirectUrl(value: string);

	public abstract get state(): AuthenticationState;

	public abstract idTokenClaims$: Observable<LoginResponse | null | undefined>;
	public abstract isAuthenticated$: Observable<boolean>;
	public abstract userId$: Observable<string | null | undefined>;
	public abstract userType$: Observable<string | null | undefined>;
	public abstract isLoading$: Observable<boolean>;
	public abstract viewModel$: Observable<AuthenticationState>;

	public abstract updateAuthState(newState: AuthenticationState): void;
	public abstract logout(): void;
	public abstract isAuthenticated(): boolean;
	public abstract isAllowed(userTypes: UserType[]): boolean;
	public abstract getRefreshTokenCommand(): RefreshTokenCommand;
	public abstract storeTokens(): void;
	public abstract storeRefreshTokens(loginResponse: LoginResponse): void;
	public abstract isTokenExpired(): boolean;
}
