import { Component, input, Input } from '@angular/core';
import { ColumnDataType } from '../../models/table-column.model';
import { AttributeDirective } from '../../directives/attribute.directive';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '@tmkn/utilities';
import { RouterModule } from '@angular/router';
import { HighlightedColors } from '../../models';

@Component({
  selector: 'tm-ui-value-container',
  templateUrl: './value-container.component.html',
  styleUrls: ['./value-container.component.scss'],
  standalone: true,
  imports: [CommonModule, AttributeDirective, TimeAgoPipe, RouterModule],
})
export class ValueContainerComponent {
  attribute = input<object>();
  classes = input<string>();
  type = input<ColumnDataType>('text');
  value = input<string>('');
  highlightedColors = input<HighlightedColors>('default');
  link = input<string>('');
  dateFormat = input<string>('dd/MM/yyyy');

  getHighlightedColors(highlightedColors: HighlightedColors) {
    switch (highlightedColors) {
      case 'red':
        return 'tm-red';
      case 'green':
        return 'tm-green';
      case 'yellow':
        return 'tm-yellow';
      case 'default':
        return '';
      default:
        return '';
    }
  }
}
