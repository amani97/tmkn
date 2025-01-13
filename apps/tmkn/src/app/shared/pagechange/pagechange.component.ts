import { Component } from '@angular/core';
import { PaginationService,pageSelection } from '../custom-pagination/pagination.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-pagechange',
    templateUrl: './pagechange.component.html',
    styleUrl: './pagechange.component.scss',
    standalone: true,
    imports: [FormsModule]
})
export class PagechangeComponent {
  public pageSize = 10;
  // pagination variables
  public skip = 0;
  public limit: number = this.pageSize;
  public currentPage = 1;
  public pageSelection: Array<pageSelection> = [];
  //** / pagination variables

  constructor(private pagination: PaginationService) {

  }

   

  
  public changePageSize(pageSize: number): void {
    this.pageSelection = [];
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    // this.getTableData();
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }

}
