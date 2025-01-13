import {
  AfterViewInit,
  Directive,
  input,
  Input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { TmColors, TmDialogTypes } from '../../../models/types';
import { TmColor } from '../../../models/enums';

@Directive({
  selector: '[tmUiStylingConfirmationDialog]',
  standalone: false,
})
export class StylingConfirmationDialogDirective implements AfterViewInit {
  dialogType = input<TmDialogTypes>('submit');

  constructor(private vr: ViewContainerRef, private ren: Renderer2) {}

  public ngAfterViewInit() {
    const dialogStyleType = `tm-confirmation-${this.dialogType()}`;
    const dialogHeader =
      this.vr.element.nativeElement.querySelector('div.top-header');
    this.ren.setAttribute(dialogHeader, dialogStyleType, '');
    this._handleIconsDialog(this.dialogType());
  }

  private _handleIconsDialog(dialogType: TmDialogTypes) {
    const icons = this.vr.element.nativeElement.getElementsByTagName('i');
    const iconColor = this._getColorByDialogType(dialogType);

    for (let i = 0; i < icons.length; i++) {
      const matIcon = icons[i].querySelector('mat-icon');
      Object.values(TmColor).filter((value) =>
        value === iconColor
          ? matIcon.classList.add(`tm-${value}`)
          : matIcon.classList.remove(`tm-${value}`)
      );
    }
  }

  private _getColorByDialogType(dialogType: TmDialogTypes): TmColors {
    let iconsColor: TmColors = 'primary';
    switch (dialogType) {
      case 'delete':
        iconsColor = 'white';
        break;
      case 'submit':
        iconsColor = 'primary';
        break;
      default:
        iconsColor = 'primary';
        break;
    }
    return iconsColor;
  }
}
