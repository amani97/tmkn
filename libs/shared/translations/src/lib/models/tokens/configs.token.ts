import { InjectionToken } from '@angular/core';
import { TranslationConfig } from '../dtos';

export const TRANSLATION_CONFIG: InjectionToken<TranslationConfig> = new InjectionToken('TRANSLATION_CONFIG');

export const LOCAL_STORAGE_KEY = 'selected-lang';
