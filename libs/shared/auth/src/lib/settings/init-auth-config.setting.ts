import { HttpBackend, HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AuthConfigService } from '../services';
import { AuthConfig } from '../model/dtos';
import { IAuthenticationAPIService } from '../abstracts/services';

/**
 * Provides configuration to the application
 *
 * @param authConfig The AuthConfig used to set Auth0 Configuration manually
 * @param config The AuthConfigClient service
 */
export const CONFIG_INITIALIZER_MANUALLY =
	(
		authConfig: AuthConfig,
		authClientConfig: AuthConfigService,
		authenticationAPIService: IAuthenticationAPIService,
	): (() => Promise<unknown>) =>
	() =>
		new Promise((resolve, reject) => {
			if (authConfig) {
				resolve(authConfig);
			} else {
				reject('You missed to set Auth0 Configuration!');
			}
		})
			.then((configs) => authClientConfig.set(configs as AuthConfig))
			.finally(() => authenticationAPIService.refreshToken().subscribe());

/**
 * Provides configuration to the application
 *
 * @param handler The HttpBackend instance used to instantiate HttpClient manually
 * @param config The AuthConfigClient service
 * @param filename The Config File Name service
 */
export const CONFIG_INITIALIZER_FROM_FILE =
	(handler: HttpBackend, config: AuthConfigService, filename: string): (() => Promise<unknown>) =>
	async () =>
		await lastValueFrom(new HttpClient(handler).get(`/assets/${filename}`)).then((loadedConfig: unknown) =>
			config.set(loadedConfig as AuthConfig),
		); // Set the config that was loaded asynchronously here
