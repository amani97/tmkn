import { Observable } from 'rxjs';
import { AuthenticationResponse, LoginResponse, UserCredential } from '../../model/dtos';
import { ConfirmEmailCommand, ForgetPasswordCommand, ResetPasswordCommand } from '../../model/commands';

export abstract class IAuthenticationAPIService {
	public abstract login(userCredential: UserCredential): Observable<AuthenticationResponse>;
	public abstract refreshToken(): Observable<LoginResponse>;
	public abstract resetPasswordEmailConfirm(command: ResetPasswordCommand): Observable<void>;
	public abstract forgetPasswordEmailConfirm(command: ForgetPasswordCommand): Observable<void>;
	public abstract confirmEmail(command: ConfirmEmailCommand): Observable<void>;
}
