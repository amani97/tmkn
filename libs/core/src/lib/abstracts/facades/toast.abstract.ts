import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationState, ToastState } from '../../models/states';
// TODO: Add ToastType
// import { ToastType } from '@tmkn/shared/ui';

@Injectable()
export abstract class IToastFacade {
  abstract ViewModel$: Observable<ToastState>;
  abstract ViewModelNotification$: Observable<NotificationState>;
  abstract OpenNotification(title: string, body: string, actionUrl?: string): void;
// TODO: Add ToastType
  abstract Open(message: string, type: any, closable: boolean, duration?: number): void;
  abstract Close(): void;
  abstract CloseNotification(): void;
}
