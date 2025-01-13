import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
  Host,
  Optional,
  HostListener,
  Inject,
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { FormArray, FormGroup, ControlContainer } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[tmUiValidatorFormEventsListener], form[formGroup]',
  standalone: false,
})
export class TmUiValidatorFormEventsListenerDirective implements OnInit, OnDestroy {
  private submit$!: Observable<Event>;
  private destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() @Host() private controlContainer: ControlContainer,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener('focusout', ['$event'])
  onFocus(event: FocusEvent): void {
    const focusedValue = (event.target as HTMLTextAreaElement)?.attributes.getNamedItem(
      'ng-reflect-name'
    );
    if (focusedValue) {
      this.markFormControlTouched(this.controlContainer.control as FormGroup, focusedValue.value);
      // TODO: Check Scroll Issue For Later
      // setTimeout(() => {
      //   this.scrollToFirstInvalidControl();
      // }, 0);
    }
  }

  ngOnInit(): void {
    // Ensure nativeElement is available in ngOnInit
    const formElement = this.elementRef.nativeElement;

    // Initialize submit$ with formElement
    this.submit$ = fromEvent<Event>(formElement, 'submit').pipe(shareReplay(1));

    this.renderer.setAttribute(this.elementRef.nativeElement, 'autocomplete', 'off');

    // Mark all the fields of this form as touched if this event is triggered
    this.submit$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.markFormGroupTouched(this.controlContainer.control as FormGroup);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Marks all controls in the FormGroup or FormArray as touched and dirty.
   * @param formGroup - The FormGroup or FormArray to mark
   */
  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Marks a specific control in the FormGroup or FormArray as touched and dirty.
   * @param formGroup - The FormGroup or FormArray containing the control
   * @param formControlName - The name of the control to mark
   */
  private markFormControlTouched(formGroup: FormGroup | FormArray, formControlName: string): void {
    const control = formGroup.get(formControlName);
    if (control) {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  }

  private scrollToFirstInvalidControl(): void {
    const firstInvalidControl = this.findFirstInvalidControl();
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  private findFirstInvalidControl(): HTMLElement | null {
    return this.document.querySelector('mat-form-field.mat-form-field-invalid');
  }
}
