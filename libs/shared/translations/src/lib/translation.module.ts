import {
  inject,
  Injector,
  ModuleWithProviders,
  NgModule,
  provideAppInitializer,
  runInInjectionContext,
} from '@angular/core';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LOCAL_STORAGE_KEY, TRANSLATION_CONFIG } from './models/tokens';
import { TranslationConfig } from './models/dtos';
import { TmknLanguagesService } from './services/languages.service';
import { lastValueFrom } from 'rxjs';

// Factory for HttpLoader
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

// Preloading function with validation to prevent duplicate initialization
export function preloadDefaultLanguage() {
  return () => {
    const injector = inject(Injector);
    return runInInjectionContext(injector, async () => {
      const translate = inject(TranslateService);
      const languagesService = inject(TmknLanguagesService);
      const config = inject(TRANSLATION_CONFIG);

      const currentLang = translate.currentLang || localStorage.getItem(LOCAL_STORAGE_KEY);
      const lang = currentLang || config.defaultLanguage;

      if (translate.currentLang !== lang) {
        // Preload the language and ensure direction is set
        languagesService.switchLanguage(lang);
        await lastValueFrom(translate.use(lang));
      }
    });
  };
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule],
})
export class TranslationModule {
  static forRoot(config: TranslationConfig): ModuleWithProviders<TranslationModule> {
    return {
      ngModule: TranslationModule,
      providers: [
        { provide: TRANSLATION_CONFIG, useValue: config },
        provideAppInitializer(preloadDefaultLanguage()),
      ],
    };
  }
}
