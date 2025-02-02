import {
  AfterContentInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  input,
} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  Observable,
  catchError,
  lastValueFrom,
  map,
  of,
  take,
  tap,
} from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { CdkTableModule } from '@angular/cdk/table';
import { ColumnStyleOptionsService } from '../../services/column-style-options.service';
import { ColumnStylesOptions } from '../../models/table-column.model';
import { CommonModule } from '@angular/common';
import { DataLoaderComponent } from '../../../loader/components/data-loader/data-loader.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Pagination } from '../../../paginator/models/pagination.model';
import {SelectionModel} from '@angular/cdk/collections';
import { TmEmptyDataComponent } from '../../../empty-data/components/tm-empty-data/tm-empty-data.component';
import { TmFormFieldModule } from '../../../form-field/form-field.module';
import { TmPaginatorComponent } from '../../../paginator/components/paginator.component';
import { TmTableMetaData } from '../../models';
import { ValueContainerComponent } from '../value-container/value-container.component';

@Component({
  selector: 'tm-ui-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ValueContainerComponent,
    MatTableModule,
    TmPaginatorComponent,
    MatGridListModule,
    TmPaginatorComponent,
    MatTooltipModule,
    CdkTableModule,
    MatProgressSpinnerModule,
    TmEmptyDataComponent,
    DataLoaderComponent,
    MatSortModule,
    MatButtonModule,
    TmFormFieldModule,
    MatMenuModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: ColumnStyleOptionsService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TmTreeTableComponent<T, G, E>
  implements AfterContentInit, OnChanges
{
  metaData = input.required<TmTableMetaData<T>>();
  metaDataLevelTwo = input<TmTableMetaData<G>>();
  metaDataLevelThree = input<TmTableMetaData<E>>();
  title = input<string>();
  data = input.required<Observable<T[]>>();
  pagination = input<Observable<Pagination>>(new Observable<Pagination>());
  showSort = input<boolean>(true);
  showPagination = input<boolean>(true);
  loading = input<boolean | null>(null);
  emptyDataMessage = input<string>('');
  showAddButton = input<boolean>(false);
  addButtonTitle = input<string>('');
  addButtonLink = input<string>('');

  @Input() fetchChildData!: (parent: any, level: string) => Observable<any[]>;

  selectedRows = input<T[]>([]);
  idKey = input<keyof T>('' as keyof T);
  @Output() paginationChange = new EventEmitter<Pagination>();
  @Output() selectedRowsChange = new EventEmitter<any[]>();

  dataSource = new MatTableDataSource<T>([]);
  displayedColumns: string[] = ['expand-icon'];
  displayedColumnsLevelTwo: string[] = [];
  displayedColumnsLevelThree: string[] = [];
  paginationTotalCount$!: Observable<number>;
  paginationPageSize$!: Observable<number>;
  paginationPageIndex$!: Observable<number>;
  multiplePages$!: Observable<boolean>;
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<any>(true, []); // true for multi-selection

  get columns() {
    if (this.metaData()) {
      return this.metaData().columns;
    }
    return [];
  }

  get columnsLevelTwo() {
    if (this.metaDataLevelTwo()) {
      return this.metaDataLevelTwo()?.columns;
    }
    return [];
  }

  get columnsLevelThree() {
    if (this.metaDataLevelThree()) {
      return this.metaDataLevelThree()?.columns;
    }
    return [];
  }

  get actions() {
    if (this.metaData()) {
      return this.metaData().actions;
    }
    return [];
  }

  get actionsLevelTwo() {
    if (this.metaData()) {
      return this.metaDataLevelTwo()?.actions;
    }
    return [];
  }

  get actionsLevelThree() {
    if (this.metaData()) {
      return this.metaDataLevelThree()?.actions;
    }
    return [];
  }

  get otherActions() {
    if (this.metaData()) {
      return this.metaData().otherActions;
    }
    return [];
  }

  get otherActionsLevelTwo() {
    if (this.metaData()) {
      return this.metaDataLevelTwo()?.otherActions;
    }
    return [];
  }

  get otherActionsLevelThree() {
    if (this.metaData()) {
      return this.metaDataLevelThree()?.otherActions;
    }
    return [];
  }

  constructor(private columnStyleOptionsService: ColumnStyleOptionsService) {}

  getClasses(styles?: ColumnStylesOptions) {
    return this.columnStyleOptionsService.setStyleClasses(styles);
  }

  ngAfterContentInit(): void {
    this.displayedColumns=[
      'select',
      'expand-icon',
      ...this.metaData().columns.map((c) => c.columnDef),
    ];
    this.displayedColumns.push('actions');
    this.displayedColumnsLevelTwo = [
      'expand-icon',
      ...(this.metaDataLevelTwo()?.columns.map((c) => c.columnDef) || []),
    ];
    this.displayedColumnsLevelTwo.push('actions');
    this.displayedColumnsLevelThree =
      this.metaDataLevelThree()?.columns.map((c) => c.columnDef) || [];
    this.displayedColumnsLevelThree.push('actions');
    this.data().subscribe((data) => (this.dataSource.data = data));
    if (this.showPagination() && this.paginator && this.pagination()) {
      this.paginationTotalCount$ = this.pagination().pipe(
        map((pagination) => pagination.totalCount)
      );
      this.paginationPageSize$ = this.pagination().pipe(
        map((pagination) => pagination.pageSize)
      );
      this.paginationPageIndex$ = this.pagination().pipe(
        map((pagination) => pagination.pageIndex)
      );
      this.multiplePages$ = this.pagination().pipe(
        map((pagination) => pagination.totalPages > 1)
      );
    }
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.data().subscribe((data) => (this.dataSource.data = data));
  }

  sortData(event: any) {
    // TODO Add Sorting Server side when needed
    console.log(event);
  }

  async onPaginationChange(event: PageEvent) {
    if (this.dataSource && this.paginator && this.showPagination()) {
      const pagination = await lastValueFrom(this.pagination().pipe(take(1)));
      pagination.pageIndex = event.pageIndex;
      pagination.pageSize = event.pageSize;
      this.paginationChange.emit(pagination);
    }
  }

  toggleRow(row: any, level: string): void {
    if (row.expanded) {
      row.expanded = false; // Collapse
    } else {
      row.expanded = true; // Expand
      if (!row.childData) {
        this.fetchChildData(row, level)
          .pipe(
            tap((data) => (row.childData = data)),
            catchError((err) => {
              console.error(`Error fetching ${level} data`, err);
              row.expanded = false;
              return of([]);
            })
          )
          .subscribe();
      }
    }
  }
  // toggleSelectAll(checked: boolean) {
  //   this.dataSource.data.forEach((row) => {
  //     (row as any).selected = checked;
  //   });
  //   console.log(this.dataSource.data);
  // }

  isRowSelected(row: T): boolean {
    const selectedRows = this.selectedRows();
    const idKey = this.idKey();
    if (selectedRows) {
      return selectedRows.findIndex((r) => r[idKey] === row[idKey]) > -1;
    }
    return false;
  }

  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  isSomeSelected() {
    return (
      this.selection.selected.length > 0 &&
      this.selection.selected.length < this.dataSource.data.length
    );
  }

  toggleAllRows(event: any) {
    if (event.checked) {
      this.selection.select(...this.dataSource.data);
    } else {
      this.selection.clear();
    }

    this.emitSelectedRows();
  }

  emitSelectedRows() {
    this.selectedRowsChange.emit(this.selection.selected); // Emit current selection
  }

  toggleSelectedRow(row: any) {
    this.selection.toggle(row);
    this.emitSelectedRows();
  }
}
