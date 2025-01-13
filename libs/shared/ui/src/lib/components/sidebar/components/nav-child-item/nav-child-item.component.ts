import { Component, input, Input } from '@angular/core';
import { NavigationDataModel } from '../../models/navigation-data.model';

@Component({
  selector: 'tm-ui-nav-child-item',
  templateUrl: './nav-child-item.component.html',
  styleUrls: ['./nav-child-item.component.scss'],
  standalone: false,
})
export class NavChildItemComponent {
  title = input.required<string>();
  routeLink = input.required<string>();
  icon = input<string>();
  isActive = input<boolean>();
  expanded = input<boolean>();
  children = input<NavigationDataModel[]>([]);
  canAccess = input<boolean>();
  disabled = input<boolean>(false);
  accordionItemStatus = false;

  onOpened() {
    this.accordionItemStatus = true;
  }
  onClosed() {
    this.accordionItemStatus = false;
  }
}
