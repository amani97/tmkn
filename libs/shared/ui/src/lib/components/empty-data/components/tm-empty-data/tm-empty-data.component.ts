import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'tm-ui-empty-data',
  templateUrl: './tm-empty-data.component.html',
  styleUrls: ['./tm-empty-data.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
})
export class TmEmptyDataComponent {
  message = input.required<string>();
  showAddButton = input<boolean>(false);
  addButtonTitle = input<string | undefined>();
  addButtonLink = input<string | undefined>();

  constructor(private router: Router) {}

  onClickButton() {
    this.router.navigate([this.addButtonLink()]);
  }
}
