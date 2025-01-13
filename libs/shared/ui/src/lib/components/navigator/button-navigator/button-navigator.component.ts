import { Component, input } from '@angular/core';
import { ButtonNavigatorItem } from '../model/button-navigator-item.dto';
import { CommonModule } from '@angular/common';
import { TmButtonModule } from '../../button/button.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tm-ui-button-navigator',
  templateUrl: './button-navigator.component.html',
  styleUrls: ['./button-navigator.component.scss'],
  standalone: true,
  imports: [CommonModule, TmButtonModule, TranslateModule],
})
export class ButtonNavigatorComponent {
  list = input<ButtonNavigatorItem[]>([]);
}
