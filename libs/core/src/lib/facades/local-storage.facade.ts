import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IStorageFacade } from '../abstracts/facades';
import { StorageState } from '../models/states';

@Injectable()
export class LocalStorageFacade implements IStorageFacade {
  private stateDataSubjects: Map<string, BehaviorSubject<StorageState>> = new Map();

  public initStorage(): void {
    const storageKeys = Object.keys(localStorage);

    storageKeys.forEach(key => {
      const data = JSON.parse(JSON.stringify(localStorage[key]));
      if (data) {
        this.stateDataSubjects.set(key, new BehaviorSubject<any>(data));
      }
    });
  }

  public getItemByKeyFromState(key: string): Observable<any> {
    if (!this.stateDataSubjects.has(key)) {
      this.stateDataSubjects.set(key, new BehaviorSubject<any>(null));
    }
    let item: any = localStorage.getItem(key);
    const storeDataKey = this.stateDataSubjects.get(key);
    if (item == 'undefined') {
      item = undefined;
    } else {
      item = JSON.parse(JSON.stringify(item));
    }

    if (storeDataKey) {
      storeDataKey.next(item);
    }
    return storeDataKey ? storeDataKey.asObservable() : of(null);
  }

  public getItemByKey(key: string): any {
    const valKey: any = localStorage.getItem(key);
    return JSON.parse(valKey);
  }

  public setItem(key: string, value: any): void {
    const addedValue = JSON.stringify(value);
    localStorage.setItem(key, addedValue);
    const storeDataKey = this.stateDataSubjects.get(key);
    if (!this.stateDataSubjects.has(key) || !storeDataKey) {
      this.stateDataSubjects.set(key, new BehaviorSubject<any>(addedValue));
    } else {
      storeDataKey.next(value);
    }
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
    const storeDataKey = this.stateDataSubjects.get(key);
    if (!this.stateDataSubjects.has(key) || !storeDataKey) {
      this.stateDataSubjects.set(key, new BehaviorSubject<any>(null));
    } else {
      storeDataKey.next({} as StorageState);
    }
  }

  public getKeyList(search: string): string[] {
    const arr = Array.from(this.stateDataSubjects.keys());
    return arr.filter(x => x.includes(search));
  }

  public clearStorage(): void {
    localStorage.clear();
  }
}
