import { Component, Renderer2 } from '@angular/core';
import {
  PaginationService,
  tablePageSize,
} from '../../../shared/custom-pagination/pagination.service';
import {
  apiResultFormat,
  examResult,
  pageSelection,
} from '../../courses-management/model/pages.model';

import { DataService } from '../../courses-management/data/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { routes } from '../../../shared/routes/routes';

interface data {
  name: string;
  code: string;
}

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrl: './exam-results.component.scss',
  standalone: false,
})
export class ExamResultsComponent {
  public routes = routes;
  starttime: data[] | undefined;
  selectedEndtime: data | undefined;
  selectedEndtime1: data | undefined;
  endtime: data[] | undefined;
  selectedStarttime: data | undefined;
  selectedStarttime1: data | undefined;
  type: data[] | undefined;
  selectedType: data | undefined;
  selectedType1: data | undefined;
  bsValue = new Date();
  initChecked = false;
  public pageSize = 10;
  public tableData: Array<examResult> = [];
  public tableDataCopy: Array<examResult> = [];
  public actualData: Array<examResult> = [];
  public currentPage = 1;

  // pagination variables

  public skip = 0;
  public limit: number = this.pageSize;

  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<examResult>;
  public searchDataValue = '';
  constructor(
    private renderer: Renderer2,
    private data: DataService,
    private pagination: PaginationService,
    private router: Router
  ) {
    this.data.getExamResult().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.examResults) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  public handleApplyClick = () => {
    const modalElements = document.getElementsByClassName('drop-width');
    if (modalElements.length > 0) {
      for (let i = 0; i < modalElements.length; i++) {
        const modalElement = modalElements[i];
        this.renderer.removeClass(modalElement, 'show');
      }
    }
  };
  ngOnInit() {
    this.starttime = [
      { name: '09:30 AM', code: '1' },
      { name: '10:30 AM', code: '2' },
      { name: '11:30 AM', code: '3' },
      { name: '12:30 PM', code: '3' },
    ];
    this.endtime = [
      { name: '10:30 AM', code: '1' },
      { name: '11:30 AM', code: '2' },
      { name: '12:30 PM', code: '3' },
      { name: '1:30 PM', code: '4' },
    ];
    this.type = [
      { name: 'Select', code: '1' },
      { name: 'Class', code: '2' },
    ];
    this.selectedType1 = this.type[1];
    this.selectedStarttime1 = this.starttime[1];
    this.selectedEndtime1 = this.endtime[1];
  }
  private getTableData(pageOption: pageSelection): void {
    this.data.getExamResult().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: examResult, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.key = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<examResult>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public searchData(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
  }
  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }
}
