import { InjectionToken } from '@angular/core';
import { CoreConfig } from '../dtos';

export const CORE_CONFIG: InjectionToken<CoreConfig> = new InjectionToken(
  'CORE_CONFIG'
);
