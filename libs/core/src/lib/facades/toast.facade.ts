import { Inject, Injectable } from '@angular/core';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { NotificationState, ToastState } from '../models/states';
import { IToastFacade } from '../abstracts/facades';
import { CoreConfig } from '../models/dtos';
import { CORE_CONFIG } from '../models/tokens';
// TODO: Add ToastType
// import { ToastType } from '@tmkn/shared/ui';

const state: ToastState = {
  visible: false,
  type: 'success',
  message: '',
  closable: true,
};

const stateNotification: NotificationState = {
  visible: false,
  title: '',
  body: '',
  actionUrl: '',
};

@Injectable()
export class ToastFacade implements IToastFacade {
  private _store = new BehaviorSubject<ToastState>(state);
  private _state$ = this._store.asObservable();

  private _storeNotification = new BehaviorSubject<NotificationState>(stateNotification);

  constructor(
    @Inject(CORE_CONFIG)
    public coreConfig: CoreConfig
  ) {}
  stateNotification$ = this._storeNotification.asObservable();

  ViewModel$: Observable<ToastState> = this._state$.pipe(
    map((toast: ToastState) => toast),
    distinctUntilChanged()
  );

  ViewModelNotification$: Observable<NotificationState> = this.stateNotification$.pipe(
    map((notification: NotificationState) => notification),
    distinctUntilChanged()
  );

  // TODO: Add ToastType
  Open(message: string, type: any, closable: boolean, duration?: number): void {
    this._store.next({
      visible: true,
      type: type ?? 'success',
      message: message ?? '',
      closable: closable,
    });

    const delayTime = duration || this.coreConfig.toastDuration;
    const resetDuration = delayTime + delayTime * 0.7;

    if (closable || duration) {
      setTimeout(() => {
        this.Close();
      }, delayTime);
      setTimeout(() => {
        this.reset();
      }, resetDuration);
    }
  }

  OpenNotification(title: string, body: string, actionUrl?: string): void {
    this._storeNotification.next({
      visible: true,
      title: title ?? '',
      body: body ?? '',
      actionUrl: actionUrl ?? '',
    });

    setTimeout(() => {
      this.CloseNotification();
    }, 10000);
    setTimeout(() => {
      this.resetNotification();
    }, 15000);
  }

  Close(): void {
    this._store.next({
      ...this._store.value,
      visible: false,
    });
  }

  CloseNotification(): void {
    this._storeNotification.next({
      ...this._storeNotification.value,
      visible: false,
    });
  }

  reset(): void {
    this._store.next({
      visible: false,
      type: 'success',
      message: '',
      closable: true,
    });
  }

  resetNotification(): void {
    this._storeNotification.next({
      visible: false,
      title: '',
      body: '',
      actionUrl: '',
    });
  }
}
