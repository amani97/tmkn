import { Component, input } from '@angular/core';
import { TmColors } from '../../../../models/types';

@Component({
  selector: 'tm-ui-icon',
  templateUrl: './tm-icon.component.html',
  styleUrls: ['./tm-icon.component.scss'],
  standalone: false,
})
export class TmIconComponent {
  tmIcon = input.required<string | undefined>();
  tmColor = input.required<TmColors | undefined>();
  size = input<string>('2');

  get sizeIcon() {
    return `${this.size()}rem`;
  }
}
