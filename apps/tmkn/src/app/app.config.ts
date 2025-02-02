import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { AuthConfig, TmAuthModule } from '@tmkn/auth';
import { CoreConfig, CoreModule } from '@tmkn/core';

import Aura from '@primeng/themes/aura';
import { SharedModule } from './shared/shared.module';
import { TmknLangs } from './shared/config';
import { TranslationModule } from '@tmkn/translations';
import { appRoutes } from './app.routes';
import { environment } from '../environments/environment.prod';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';

const authConfig: AuthConfig = {
  baseUrl: environment.AUTH__BASE_URL,
  authUrl: environment.AUTH__AUTH_URL,
  oAuth_Secret: environment.AUTH__OAUTH_SECRET,
  oAuth_Client: environment.AUTH__OAUTH_CLIENT,
};

const coreConfig: CoreConfig = {
  baseAPI: environment.BASE_API_URL,
  pageSize: environment.PAGE_SIZE,
  toastDuration: environment.TOAST_DURATION_TIME,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      TranslationModule.forRoot({
        defaultLanguage: TmknLangs.English,
        supportedLanguages: Object.values(TmknLangs),
      }),
      TmAuthModule.forRoot(authConfig),
      CoreModule.forRoot(coreConfig),
      SharedModule
    ),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
