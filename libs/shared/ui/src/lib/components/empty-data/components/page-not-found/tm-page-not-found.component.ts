import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tm-ui-page-not-found',
  templateUrl: './tm-page-not-found.component.html',
  styleUrls: ['./tm-page-not-found.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
})
export class TmPageNotFoundComponent {
  mainTitle = input.required<string>();
  subTitle = input<string | undefined>();
  backButtonTitle = input<string | undefined>();
  backButtonLink = input<string | undefined>();
}
