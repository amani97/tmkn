import { IAuthenticationAPIService } from '../abstracts/services';

export const REFRESH_TOKEN_INITIALIZER =
	(authenticationAPIService: IAuthenticationAPIService): (() => any) =>
	() =>
		authenticationAPIService.refreshToken().subscribe();
