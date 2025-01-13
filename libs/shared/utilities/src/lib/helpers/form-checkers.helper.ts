import { FormGroup, AbstractControl } from '@angular/forms';

export const checkIsFormGroupDirty = (formGroup: FormGroup): boolean => {
  return Object.keys(formGroup.controls).some(key => {
    const control = formGroup.get(key) as AbstractControl;
    return control.dirty && control.touched && !control.valid;
  });
};
