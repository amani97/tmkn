import { InjectionToken } from '@angular/core';

export const TM_HTTP_NOTIFICATION_MESSAGES = new InjectionToken('TM_HTTP_NOTIFICATION_MESSAGES', {
  providedIn: 'root',
  factory: () => defaultMessages,
});

const defaultMessages = {
  success: 'The process completed successfully',
};
