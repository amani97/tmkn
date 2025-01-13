import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export const HasAtLeastNRowValidator = (minRequired = 1) => {
  const validator: ValidatorFn = (formArray: AbstractControl) => {
    if (formArray instanceof FormArray) {
      let rows = 0;
      const controls = formArray.controls;
      rows = controls.length;
      if (rows < minRequired) {
        return {
          atLeastNRow: {
            actualRowsCount: rows,
            requiredRowsCount: minRequired,
          },
        };
      }
      return null;
    }

    throw new Error('formArray is not an instance of FormArray');
  };

  return validator;
};


export const PhoneNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const phoneNumberRegex = /^(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,10})$/g;

  if (control.value == null || control.value === '') {
    return null;
  }

  const isValid = phoneNumberRegex.test(control.value);

  return isValid ? null : { invalidPhoneNumber: true };
};
