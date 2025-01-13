import { Component, input } from '@angular/core';
import { TmColors } from '../../../models/types';

@Component({
  selector: 'tm-ui-flat-button',
  templateUrl: './flat-button.component.html',
  styleUrls: ['./flat-button.component.scss'],
  standalone: false,
})
export class FlatButtonComponent {
  routerLink = input<string>();
  color = input<TmColors>('yellow');
  icon = input.required<string>();
  title = input.required<string>();
  exactMatch = input<boolean>(true);
}
