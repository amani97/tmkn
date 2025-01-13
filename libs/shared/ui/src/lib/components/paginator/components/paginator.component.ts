import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { StylePaginatorDirective } from '../directives/style-paginator.directive';

@Component({
  selector: 'tm-ui-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, StylePaginatorDirective],
})
export class TmPaginatorComponent extends MatPaginator {
  showTotalPages = input<number>(5);

  setPage(event: PageEvent) {
    this.page.emit(event);
  }
}
