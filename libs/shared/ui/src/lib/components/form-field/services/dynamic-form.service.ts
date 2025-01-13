import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicFormField } from '../models/dtos/form-field.dto';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  constructor(private fb: FormBuilder) {}

  createForm(fields: DynamicFormField[]): FormGroup {
    const group: { [key: string]: any } = {};
    fields.forEach((field) => {
      const controlValidators = field.validators || [];
      if (field.required) {
        controlValidators.push(Validators.required);
      }
      group[field.key] = this.fb.control(field.value || '', controlValidators);
    });
    return this.fb.group(group);
  }
}
