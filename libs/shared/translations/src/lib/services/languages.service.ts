import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationConfig } from '../models/dtos';
import { LOCAL_STORAGE_KEY, TRANSLATION_CONFIG } from '../models/tokens';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TmknLanguagesService {
  private supportedLanguages: string[];
  private renderer: Renderer2;

  constructor(
    private translate: TranslateService,
    @Inject(TRANSLATION_CONFIG) private config: TranslationConfig,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.supportedLanguages = config.supportedLanguages;
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.config.defaultLanguage;
  }

  switchLanguage(lang: string): void {
    if (this.supportedLanguages.includes(lang)) {
      if (this.translate.currentLang !== lang) {
        this.translate.use(lang);
        localStorage.setItem(LOCAL_STORAGE_KEY, lang);
        this.setDirection(lang); // Adjust direction based on language
      }
    } else {
      console.warn(`Language "${lang}" is not supported.`);
    }
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

  private setDirection(lang: string): void {
    const isRtl = ['ar', 'he', 'fa', 'ur'].includes(lang); // List of RTL languages
    const dir = isRtl ? 'rtl' : 'ltr';

    // Update the `dir` attribute of the HTML document
    this.renderer.setAttribute(this.document.documentElement, 'dir', dir);

    // Optionally, update the `lang` attribute
    this.renderer.setAttribute(this.document.documentElement, 'lang', lang);

    // Add a class to enable further CSS adjustments if needed
    this.renderer.addClass(this.document.body, dir);
    this.renderer.removeClass(this.document.body, isRtl ? 'ltr' : 'rtl');
  }
}
