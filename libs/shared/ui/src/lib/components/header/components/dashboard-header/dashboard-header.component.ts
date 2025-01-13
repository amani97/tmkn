import { Component, input } from '@angular/core';
import { MenuDataModel } from '../../models/menu-data.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tm-ui-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatMenuModule,  RouterModule],
})
export class DashboardHeaderComponent {
  menuDataList = input.required<MenuDataModel[]>();
  welcomeMessage = input<string>();
  firstName = input<string>();
  lastName = input<string>();
  userImgURL = input<string>();

  get initials(): string {
    return `${(this.firstName()?.[0] ?? '').toUpperCase()}${(this.lastName()?.[0] ?? '').toUpperCase()}`;
  }
}
