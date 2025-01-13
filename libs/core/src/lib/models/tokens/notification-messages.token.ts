import { InjectionToken } from '@angular/core';

export const TM_NOTIFICATION_MESSAGES = new InjectionToken('TM_NOTIFICATION_MESSAGES', {
  providedIn: 'root',
  factory: () => defaultMessages,
});

const defaultMessages = {
  error: 'Something went wrong',
  success: 'The process completed successfully',
};
