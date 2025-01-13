// TODO: Add ToastType
// import { ToastType } from '@tmkn/shared/ui';

export interface ToastState {
  visible?: boolean;
  // TODO: Add ToastType
  type?: any;
  message: string;
  closable?: boolean;
}
