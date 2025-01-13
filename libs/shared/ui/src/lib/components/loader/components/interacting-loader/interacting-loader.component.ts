import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'tm-ui-interacting-loader',
  templateUrl: './interacting-loader.component.html',
  styleUrls: ['./interacting-loader.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class InteractingLoaderComponent {
  fullLogo = input<boolean>(true);
}
