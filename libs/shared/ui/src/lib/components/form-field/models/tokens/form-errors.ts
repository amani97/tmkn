import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  required: () => `This field is required`,
  minlength: (rangeValues: { requiredLength: number; actualLength: number }) =>
    `Expect ${rangeValues.requiredLength} but got ${rangeValues.actualLength}`,
};

export const TM_FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors,
});
