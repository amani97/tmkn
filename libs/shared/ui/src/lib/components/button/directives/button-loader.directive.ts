import {
  Directive,
  OnChanges,
  ComponentRef,
  ViewContainerRef,
  Renderer2,
  SimpleChanges,
  input,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `button`,
  standalone: false,
})
export class ButtonLoadingDirective implements OnChanges {
  private spinner!: ComponentRef<MatProgressSpinner> | null;

  loading = input<boolean | null>(false);
  disabled = input(false);
  color = input<ThemePalette>();

  constructor(
    private matButton: MatButton,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['loading']) {
      return;
    }

    if (changes['loading'].currentValue) {
      this.matButton._elementRef.nativeElement.classList.add('button-loading');
      this.matButton.disabled = true;
      this.createSpinner();
    } else if (!changes['loading'].firstChange) {
      this.matButton._elementRef.nativeElement.classList.remove('button-loading');
      this.matButton.disabled = this.disabled();
      this.destroySpinner();
    }
  }

  private createSpinner(): void {
    if (!this.spinner) {
      this.spinner = this.viewContainerRef.createComponent(MatProgressSpinner);
      this.spinner.instance.color = this.color();
      this.spinner.instance.diameter = 25;
      this.spinner.instance.mode = 'indeterminate';
      this.renderer.appendChild(
        this.matButton._elementRef.nativeElement,
        this.spinner.instance._elementRef.nativeElement
      );
    }
  }

  private destroySpinner(): void {
    if (this.spinner) {
      this.spinner.destroy();
      this.spinner = null;
    }
  }
}
