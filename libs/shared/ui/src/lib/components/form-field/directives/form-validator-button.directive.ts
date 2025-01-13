import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Directive({
  selector: '[tmUiFGsValidatorButton]',
  standalone: false,
})
export class FGsValidatorButtonDirective implements OnInit {
  private click$!: Observable<Event>;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    const formElement = this.elementRef.nativeElement;
    this.click$ = fromEvent<Event>(formElement, 'click').pipe(shareReplay(1));

    this.click$.subscribe(() => {
      const componentProperties = this.getComponentProperties();

      for (const property of Object.values(componentProperties)) {
        if (property instanceof FormGroup) {
          this.markFormGroupTouched(property);
          setTimeout(() => {
            this.scrollToFirstInvalidControl();
          }, 0);
        }
      }
    });
  }

  /**
   * Marks all controls in the FormGroup or FormArray as touched and dirty.
   * @param formGroup - The FormGroup or FormArray to mark
   */
  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private scrollToFirstInvalidControl(): void {
    const firstInvalidControl = this.findFirstInvalidControl();
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  private findFirstInvalidControl(): HTMLElement | null {
    return this.document.querySelector('mat-form-field.mat-form-field-invalid');
  }

  private getComponentProperties(): { [key: string]: unknown } {
    const lView = (this.viewContainerRef.injector as any)._lView;
    return lView ? lView[8] : {};
  }
}
