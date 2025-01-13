import { Route } from '@angular/router';
import { AuthRoute } from './settings';
import { CompleteLoginComponent } from './components/complete-login/complete-login.component';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';

export const AUTH_ROUTES: Route[] = [
	{
		path: AuthRoute.Main,
		children: [
			{ path: AuthRoute.Register, component: LoginComponent },
			{ path: AuthRoute.Profile, component: LoginComponent },
			{ path: AuthRoute.Login, component: LoginComponent },
			{ path: AuthRoute.LoginFailed, component: LoginComponent },
			{ path: AuthRoute.LoginCallback, component: LoginCallbackComponent },
			{ path: AuthRoute.SilentLoginCallback, component: LoginComponent },
			{ path: AuthRoute.Logout, component: LogoutComponent },
			{ path: AuthRoute.LoggedOut, component: LogoutComponent },
			{ path: AuthRoute.LogoutCallback, component: LogoutComponent },
			{ path: AuthRoute.CompleteLogin, component: CompleteLoginComponent },
			{ path: AuthRoute.ResetPassword, component: ResetPasswordComponent },
			{ path: AuthRoute.ForgetPassword, component: ForgetPasswordComponent },
			{ path: AuthRoute.ConfirmEmail, component: ConfirmEmailComponent },
		],
	},
];
