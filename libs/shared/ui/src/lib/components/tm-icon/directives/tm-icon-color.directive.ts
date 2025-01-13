import { Directive, ElementRef, input, OnChanges } from '@angular/core';
import { TmColors } from '../../../models/types';
import { TmColor } from '../../../models/enums';

@Directive({
  selector: '[tmUiIconColor]',
  standalone: false
})
export class TmIconColorDirective implements OnChanges {
  tmUiIconColor = input.required<TmColors>();

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    if (this.tmUiIconColor) {
      this.settingNewClassStyle(this.tmUiIconColor());
    } else {
      this.settingNewClassStyle(TmColor.Primary);
    }
  }

  settingNewClassStyle(className: TmColors) {
    const tmIconElement = this.el.nativeElement;

    Object.values(TmColor).filter(value =>
      value === className
        ? tmIconElement.classList.add(`tm-${value}`)
        : tmIconElement.classList.remove(`tm-${value}`)
    );
  }
}
