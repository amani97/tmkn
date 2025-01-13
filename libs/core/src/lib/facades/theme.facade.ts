import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { IStorageFacade, IThemeFacade } from '../abstracts/facades';
import { ThemeType } from '../models/types';
import { ThemeState } from '../models/states';

@Injectable()
export class ThemeFacade implements IThemeFacade {
  private _initState: ThemeState = {
    activeTheme: 'light',
    darkModeStatus: false,
  };
  private store = new BehaviorSubject<ThemeState>(this._initState);
  public ViewModel$ = this.store.asObservable().pipe(distinctUntilChanged());

  constructor(
    private storageFacade: IStorageFacade,
    @Inject(DOCUMENT) private document: Document
  ) {}

  initActiveTheme() {
    // initialize active theme with the previously stored theme
    let state = this.storageFacade.getItemByKey<ThemeState>('theme');
    if (!state) {
      state = {} as ThemeState;
    }
    if (state.darkModeStatus) {
      this.darkMode(true);
    }
    if (state.activeTheme) {
      this.setTheme(state.activeTheme);
    } else {
      state.activeTheme = this._initState.activeTheme;
      this.storageFacade.setItem('theme', state);
    }
    this.setTheme(state.activeTheme);
  }

  darkMode(on: boolean): void {
    const classList = this.document?.body.classList;
    if (on) {
      classList.add('dark-theme');
    } else {
      classList.remove('dark-theme');
    }
    this._updateState({
      ...this._initState,
      activeTheme: on ? 'dark' : 'light',
      darkModeStatus: on,
    });
  }

  setTheme(theme: ThemeType): void {
    this._switchTheme(theme);
    this._updateState({ ...this._initState, activeTheme: theme });
  }

  private _updateState(state: ThemeState) {
    this.storageFacade.setItem('theme', state);
    this.store.next((this._initState = state));
  }

  private _findStyle(theme: string) {
    const links = this.document.getElementsByTagName('link');
    let styleExist = false;
    for (const key in links) {
      if (Object.prototype.hasOwnProperty.call(links, key)) {
        if (
          links[key].rel.indexOf('stylesheet') !== -1 &&
          links[key].title === theme
        ) {
          styleExist = true;
        }
      }
    }
    return styleExist;
  }

  private _switchTheme(theme: ThemeType) {
    if (theme && this._findStyle(theme)) {
      const links = this.document?.getElementsByTagName('link');
      for (const key in links) {
        if (Object.prototype.hasOwnProperty.call(links, key)) {
          const link = links[key];
          if (link.rel.indexOf('stylesheet') !== -1 && link.title) {
            if (link.title === theme) {
              link.disabled = false;
            } else {
              link.disabled = true;
            }
          }
        }
      }
    }
  }
}
