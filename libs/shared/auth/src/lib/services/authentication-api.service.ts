import { Injectable } from '@angular/core';
import {
  AuthenticationResponse,
  LoginResponse,
  UserCredential,
} from '../model/dtos';
import {
  ConfirmEmailCommand,
  ForgetPasswordCommand,
  ResetPasswordCommand,
} from '../model/commands';
import { Observable } from 'rxjs';
import { IAuthenticationAPIService } from '../abstracts/services/authentication-api.abstract';

@Injectable()
export class AuthenticationAPIService implements IAuthenticationAPIService {
  public login(
    userCredential: UserCredential
  ): Observable<AuthenticationResponse> {
    throw new Error('Method not implemented.');
  }
  public refreshToken(): Observable<LoginResponse> {
    throw new Error('Method not implemented.');
  }
  public resetPasswordEmailConfirm(
    command: ResetPasswordCommand
  ): Observable<void> {
    throw new Error('Method not implemented.');
  }
  public forgetPasswordEmailConfirm(
    command: ForgetPasswordCommand
  ): Observable<void> {
    throw new Error('Method not implemented.');
  }
  public confirmEmail(command: ConfirmEmailCommand): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
