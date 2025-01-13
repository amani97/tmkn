import { InjectionToken } from '@angular/core';
import { AuthConfig } from '../dtos';

export const CONFIG_MODULE = new InjectionToken<AuthConfig>('config');

export const CONFIG_FILE_NAME = new InjectionToken<string>('fileName');
