import { Injectable } from '@angular/core';
import { IAuthConfigService } from '../abstracts/services';
import { AuthConfig } from '../model/dtos';

@Injectable()
export class AuthConfigService implements IAuthConfigService {
	config!: AuthConfig;

	get authConfig(): AuthConfig {
		return this.config;
	}

	set(config: AuthConfig) {
		this.config = config;
	}
}
