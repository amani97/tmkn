import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class IStorageFacade {
  abstract initStorage(): void;
  abstract getItemByKeyFromState<T>(key: string): Observable<T>;
  abstract getItemByKey<T>(key: string): T;
  abstract setItem(key: string, value: unknown): void;
  abstract removeItem(key: string): void;
  abstract getKeyList(key: string): string[];
  abstract clearStorage(): void;
}
