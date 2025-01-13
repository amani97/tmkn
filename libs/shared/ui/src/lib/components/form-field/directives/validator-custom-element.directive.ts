import { AfterViewInit, Directive, ElementRef, Host, Inject, Optional, Renderer2 } from '@angular/core';
import { ControlContainer, FormControl, NgControl } from '@angular/forms';
import { TM_FORM_ERRORS } from '../models/tokens';

@Directive({
  // TODO: Check mat-checkbox
  // TODO: Check mat-radio-group
  selector: '[tmUiValidatorCustomElement]',
  standalone: false,
})
export class TmUiValidatorCustomElementDirective implements AfterViewInit {
  private inputRef?: FormControl;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngControl: NgControl,
    @Optional() @Host() private controlContainer: ControlContainer,
    @Inject(TM_FORM_ERRORS) private errors: Record<string, (error: unknown) => string>
  ) {}

  ngAfterViewInit(): void {
    if (!this.controlContainer) return;

    this.controlContainer.formDirective?.getControl(this.ngControl).statusChanges?.subscribe(status => {
      this.inputRef = this.controlContainer.formDirective?.getControl(this.ngControl);
      const baseContainer = this.el.nativeElement.parentNode;
      const existingErrorElement = this.el.nativeElement.parentNode.querySelector('#radio-error');

      if (status === 'INVALID') {
        if (!existingErrorElement && this.inputRef?.errors) {
          const firstErrorKey = Object.keys(this.inputRef.errors)[0];
          const errorMessage = this.getErrorMessage(firstErrorKey);

          if (errorMessage) {
            this.addErrorElement(baseContainer, errorMessage);
          }
        }
      } else {
        if (existingErrorElement) {
          this.removeErrorElement(baseContainer, existingErrorElement);
        }
      }
    });
  }

  /**
   * Retrieves the error message for the given error key.
   * @param errorKey - The key of the error
   * @returns The error message
   */
  private getErrorMessage(errorKey: string): string | undefined {
    const getError = this.errors[errorKey];
    return getError ? getError(this.inputRef?.errors?.[errorKey]) : undefined;
  }

  /**
   * Adds an error message element to the form field.
   * @param baseContainer - The parent container element
   * @param errorMessage - The error message to display
   */
  private addErrorElement(baseContainer: HTMLElement, errorMessage: string): void {
    this.renderer.addClass(baseContainer, 'flex-column');
    const errorElement = this.renderer.createElement('mat-error');
    this.renderer.addClass(errorElement, 'mat-error');
    this.renderer.setAttribute(errorElement, 'id', 'radio-error');
    this.renderer.setStyle(errorElement, 'font-size', '12px');
    this.renderer.setStyle(errorElement, 'align-self', 'flex-start');
    this.renderer.setStyle(errorElement, 'color', 'var(--mdc-theme-error, #ea5455)');
    this.renderer.appendChild(errorElement, this.renderer.createText(errorMessage));
    this.renderer.appendChild(this.el.nativeElement.parentNode, errorElement);
  }

  /**
   * Removes the error message element from the form field.
   * @param baseContainer - The parent container element
   * @param errorElement - The error element to remove
   */
  private removeErrorElement(baseContainer: HTMLElement, errorElement: HTMLElement): void {
    this.renderer.removeClass(baseContainer, 'flex-column');
    this.renderer.removeChild(this.el.nativeElement.parentNode, errorElement);
  }
}
