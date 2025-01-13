import { Component, input } from '@angular/core';
import { TmColors } from '../../../../models/types';

@Component({
  selector: 'tm-ui-tabler-icon',
  templateUrl: './tabler-icon.component.html',
  styleUrls: ['./tabler-icon.component.scss'],
  standalone: false,
})
export class TablerIconComponent {
  tmIcon = input.required<string | undefined>();
  tmColor = input.required<TmColors | undefined>();
  hint = input<string>('');
  size = input<string>('1.8');

  get sizeIcon() {
    return `${this.size()}rem`;
  }
}
