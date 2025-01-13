import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslationModule } from '@tmkn/translations';
import { provideHttpClient } from '@angular/common/http';
import { AuthConfig, TmAuthModule } from '@tmkn/auth';
import { environment } from '../environments/environment.prod';
import { CoreConfig, CoreModule } from '@tmkn/core';
import { SharedModule } from './shared/shared.module';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { TmknLangs } from './shared/config';

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
          preset: Aura
      }
  })

  ],
};
