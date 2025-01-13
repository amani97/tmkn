import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'tm-ui-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
})
export class SectionComponent {
  icon = input.required<string>();
  title = input.required<string>();
}
