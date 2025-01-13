import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class ILoaderFacade {
  abstract isLoading: Subject<boolean>;
  abstract Show(): void;
  abstract Hide(): void;
}
