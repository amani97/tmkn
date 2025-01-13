import { APP_INITIALIZER, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CompleteLoginComponent } from './components/complete-login/complete-login.component';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { CONFIG_FILE_NAME, CONFIG_MODULE } from './model/tokens';
import { CONFIG_INITIALIZER_MANUALLY } from './settings';
import { IAuthenticationFacade } from './abstracts/facades';
import { AuthenticationFacade } from './facades';
import { IAuthConfigService, IAuthenticationAPIService } from './abstracts/services';
import { AuthConfigService } from './services';
import { AuthenticationAPIService } from './services/authentication-api.service';
import { IStorageFacade, LocalStorageFacade } from '@tmkn/core';
import { AUTH_ROUTES } from './lib.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHttpInterceptor } from './interceptors/auth.interceptor';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthConfig } from './model/dtos';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { GlobalLoaderComponent } from '@tmkn/ui';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { TranslateModule } from '@ngx-translate/core';

const ServiceProviders: Provider[] = [
	{
		provide: IAuthConfigService,
		useClass: AuthConfigService,
		multi: false,
	},
	{
		provide: IAuthenticationAPIService,
		useClass: AuthenticationAPIService,
		multi: false,
	},
	{
		provide: IStorageFacade,
		useClass: LocalStorageFacade,
		multi: false,
	},
];

const FacadeProviders: Provider[] = [
	{
		provide: IAuthenticationFacade,
		useClass: AuthenticationFacade,
		multi: false,
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(AUTH_ROUTES),
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		GlobalLoaderComponent,
    TranslateModule
	],
	declarations: [
		LoginComponent,
		CompleteLoginComponent,
		LogoutComponent,
		LoginCallbackComponent,
		ResetPasswordComponent,
		ForgetPasswordComponent,
		ConfirmEmailComponent,
	],
	providers: [FacadeProviders, ServiceProviders],
})
export class TmAuthModule {
	/**
	 * Auth Configuration
	 * @param config when pass [AuthConfig] type so you can use setting CONFIG_INITIALIZER_MANUALLY,
	 * When you pass [string] so you can use setting CONFIG_INITIALIZER_FROM_FILE and pass file name without extension
	 */
	static forRoot(config: string | AuthConfig): ModuleWithProviders<TmAuthModule> {
		return {
			ngModule: TmAuthModule,
			providers: [
				FacadeProviders,
				ServiceProviders,
				{
					provide: CONFIG_MODULE,
					useValue: config,
				},
				{
					provide: CONFIG_FILE_NAME,
					useValue: config,
				},
				//? Uncomment [CONFIG_INITIALIZER_MANUALLY] to setting auth configuration manually
				// {
				// 	provide: APP_INITIALIZER,
				// 	useFactory: CONFIG_INITIALIZER_MANUALLY,
				// 	deps: [CONFIG_MODULE, IAuthConfigService, IAuthenticationAPIService],
				// 	multi: true,
				// },
				// {
				// 	provide: APP_INITIALIZER,
				// 	useFactory: CONFIG_INITIALIZER_FROM_FILE,
				// 	deps: [HttpBackend, IAuthConfigService, CONFIG_FILE_NAME],
				// 	multi: true,
				// },
				// {
				// 	provide: HTTP_INTERCEPTORS,
				// 	useClass: AuthHttpInterceptor,
				// 	multi: true,
				// },
				// { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
			],
		};
	}
}
