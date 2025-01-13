import { Component, input, signal } from '@angular/core';
import { NavigationDataModel } from '../../models/navigation-data.model';

@Component({
  selector: 'tm-ui-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  standalone: false,
})
export class NavItemComponent {
  title = input.required<string>();
  routeLink = input.required<string>();
  icon = input<string>();
  isActive = input<boolean>();
  expanded = input<boolean>();
  children = input<NavigationDataModel[]>([]);
  canAccess = input<boolean>();
  disabled = input<boolean>(false);

  _isActive = signal(this.isActive());

  changeActiveStatus(event: boolean) {
    this._isActive.set(event);
  }
}
