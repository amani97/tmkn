import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ILoaderFacade } from '../abstracts/facades';

@Injectable()
export class LoaderFacade implements ILoaderFacade {
  public isLoading = new Subject<boolean>();

  public Show(): void {
    this.isLoading.next(true);
  }
  public Hide(): void {
    this.isLoading.next(false);
  }
}
