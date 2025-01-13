import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ILoaderFacade,
  IThemeFacade,
  IStorageFacade,
  IToastFacade,
} from './abstracts/facades';
import { IFormArrayService } from './abstracts/form-array';
import { INavigationManagerService, ITagManagerService } from './abstracts/services';
import {
  LoaderFacade,
  ThemeFacade,
  LocalStorageFacade,
  ToastFacade,
} from './facades';
import {
  ErrorInterceptor,
  PaginationInterceptor,
  DefaultInterceptor,
  CleanRequestInterceptor,
} from './interceptors';
import { SuccessMessageInterceptor } from './interceptors/success.interceptor';
import { TagManagerService, FormArrayService, NavigationManagerService } from './services';
import { CoreConfig } from './models/dtos';
import { CORE_CONFIG } from './models/tokens';

const FacadeProviders: Provider[] = [
  { provide: ILoaderFacade, useClass: LoaderFacade, multi: false },
  { provide: IThemeFacade, useClass: ThemeFacade, multi: false },
  { provide: IStorageFacade, useClass: LocalStorageFacade, multi: false },
  { provide: IToastFacade, useClass: ToastFacade, multi: false },
];

const ServicesProviders: Provider[] = [
  { provide: ITagManagerService, useClass: TagManagerService, multi: false },
  { provide: IFormArrayService, useClass: FormArrayService, multi: false },
  {
		provide: INavigationManagerService,
		useClass: NavigationManagerService,
		multi: false,
	},
];

const HttpInterceptorProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SuccessMessageInterceptor,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: PaginationInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CleanRequestInterceptor,
    multi: true,
  },
];

@NgModule({
  imports: [CommonModule],
  providers: [FacadeProviders, ServicesProviders],
})
export class CoreModule {
  constructor(
    private storageFacade: IStorageFacade,
    private themeFacade: IThemeFacade,
    private tagManagerService: ITagManagerService,
    private navigationManagerService: INavigationManagerService,
  ) {
    // TODO: Uncomment this line when lazy load bootstrap grid css
    // this.tagManagerService.addTag({
    //   id: 'bootstrap-grid',
    //   rel: 'stylesheet',
    //   href: 'bootstrap-grid.css',
    // });

    this.storageFacade.initStorage();
    this.themeFacade.initActiveTheme();
    this.themeFacade.ViewModel$.subscribe((state) => {
      if (state.darkModeStatus) {
        this.tagManagerService.removeTag('theme-mode');
        this.tagManagerService.addTag({
          id: 'theme-mode',
          rel: 'stylesheet',
          href: 'dark-theme.css',
        });
      }
    });
    this.navigationManagerService.init();
  }

  /**
   * Core Configuration
   * @param coreConfig Config for base api and other configs.
   */
  static forRoot(coreConfig?: CoreConfig): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        FacadeProviders,
        ServicesProviders,
        HttpInterceptorProviders,
        { provide: CORE_CONFIG, useValue: coreConfig },
      ],
    };
  }
}
