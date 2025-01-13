import { Component, AfterViewInit, Injector, Inject } from '@angular/core';
import { MatFormFieldControl, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TM_FORM_ERRORS } from '../models/tokens/form-errors';

@Component({
  selector: 'tm-ui-form-error-messages, [tmUiFormErrorMessages]',
  template: '{{ error }}',
  standalone: false,
})
export class TmUiFormErrorMessagesComponent implements AfterViewInit {
  error = '';
  inputRef!: MatFormFieldControl<MatInput>;

  constructor(
    private injector: Injector,
    @Inject(TM_FORM_ERRORS) private errors: Record<string, (error: unknown) => string>
  ) {}

  ngAfterViewInit(): void {
    // Grab reference to MatFormField directive, where form control is accessible
    const container = this.injector.get(MatFormField);
    this.inputRef = container._control;

    // Subscribe to the control's status stream
    this.inputRef?.ngControl?.statusChanges?.subscribe(this.updateErrors);
  }

  /**
   * Updates the error message based on the control's state.
   * @param state - The state of the control, either 'VALID' or 'INVALID'
   */
  updateErrors = (state: 'VALID' | 'INVALID'): void => {
    if (state === 'INVALID') {
      const controlErrors = this.inputRef.ngControl?.errors;
      if (controlErrors) {
        const firstErrorKey = Object.keys(controlErrors)[0];
        const errorMessage = this.getErrorMessage(firstErrorKey, controlErrors[firstErrorKey]);
        this.error = errorMessage;
      } else {
        this.error = '';
      }
    } else {
      this.error = '';
    }
  };

  /**
   * Retrieves the error message for the given error key.
   * @param errorKey - The key of the error
   * @param errorValue - The value of the error
   * @returns The error message
   */
  private getErrorMessage(errorKey: string, errorValue: unknown): string {
    const getError = this.errors[errorKey];
    return getError ? (getError(errorValue) as string) : '';
  }
}
