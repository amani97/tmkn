import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeState } from '../../models/states';
import { ThemeType } from '../../models/types';

@Injectable()
export abstract class IThemeFacade {
  abstract ViewModel$: Observable<ThemeState>;
  abstract initActiveTheme(): void;
  abstract setTheme(theme: ThemeType): void;
  abstract darkMode(on: boolean): void;
}
