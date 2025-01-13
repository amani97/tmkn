import { Observable, map, distinctUntilChanged, combineLatest } from 'rxjs';
import { IAuthenticationFacade } from '../abstracts/facades/authentication.abstract';
import { AuthenticationState } from '../model/states';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/dtos';
import { RefreshTokenCommand } from '../model/commands';
import { jwtDecode } from 'jwt-decode';
import { UserType } from '../model/enums';

@Injectable()
export class AuthenticationFacade extends IAuthenticationFacade {
  get redirectUrl(): string {
    throw new Error('Method not implemented.');
  }
  set redirectUrl(value: string) {
    throw new Error('Method not implemented.');
  }
  public get state(): AuthenticationState {
    throw new Error('Method not implemented.');
  }
  public idTokenClaims$: Observable<LoginResponse | null | undefined> =
    this.state$.pipe(
      map((state: AuthenticationState) => state.idTokenClaims),
      distinctUntilChanged()
    );
  public isAuthenticated$: Observable<boolean> = this.state$.pipe(
    map((state: AuthenticationState) => state.isAuthenticated),
    distinctUntilChanged()
  );
  public userId$: Observable<string | null | undefined> = this.state$.pipe(
    map((state: AuthenticationState) => state.idTokenClaims),
    map((token: LoginResponse | null | undefined) =>
      token ? jwtDecode(token!.access_token)['sub'] : null
    ),
    distinctUntilChanged()
  );
  public userType$: Observable<string | null | undefined> = this.state$.pipe(
    map((state: AuthenticationState) => state.idTokenClaims),
    map((token: LoginResponse | null | undefined) =>
      token ? (jwtDecode(token!.access_token) as never)['UserType'] : null
    ),
    distinctUntilChanged()
  );
  public isLoading$: Observable<boolean> = this.state$.pipe(
    map((state: AuthenticationState) => state.isLoading),
    distinctUntilChanged()
  );
  public viewModel$: Observable<AuthenticationState> = combineLatest([
    this.idTokenClaims$,
    this.isAuthenticated$,
    this.isLoading$,
  ]).pipe(
    map(([idTokenClaims, isAuthenticated, isLoading]) => ({
      idTokenClaims,
      isAuthenticated,
      isLoading,
    }))
  );
  public updateAuthState(newState: AuthenticationState): void {
    throw new Error('Method not implemented.');
  }
  public logout(): void {
    throw new Error('Method not implemented.');
  }
  public isAuthenticated(): boolean {
    throw new Error('Method not implemented.');
  }
  public isAllowed(userTypes: UserType[]): boolean {
    throw new Error('Method not implemented.');
  }
  public getRefreshTokenCommand(): RefreshTokenCommand {
    throw new Error('Method not implemented.');
  }
  public storeTokens(): void {
    throw new Error('Method not implemented.');
  }
  public storeRefreshTokens(loginResponse: LoginResponse): void {
    throw new Error('Method not implemented.');
  }
  public isTokenExpired(): boolean {
    throw new Error('Method not implemented.');
  }
}
