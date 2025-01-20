import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { Pagination, TmDialogType } from '@tmkn/ui';

import { Course } from 'apps/tmkn/src/app/feature-module/courses-management/model/course.model';
import { CoursesService } from 'apps/tmkn/src/app/feature-module/courses-management/data/courses.service';
import { INavigationManagerService } from '@tmkn/core';
import { Router } from '@angular/router';
import { TmConfirmationDialogService } from 'libs/shared/ui/src/lib/components/dialog/services/confirmation-dialog.service';
import { TmTableMetaData } from 'libs/shared/ui/src/lib/components/table/models';
import { TmknAppRoutes } from 'apps/tmkn/src/app/shared/config';
import { routes } from 'apps/tmkn/src/app/shared/routes/routes';

@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  private readonly navigationManagerService = inject(INavigationManagerService);
  private coursesService = inject(CoursesService);
  private readonly router = inject(Router);
  private readonly confirmationDialogService = inject(
    TmConfirmationDialogService
  );
  selectedRows: any[] = []; // Holds selected rows from the table

  classes = ['Class 1', 'Class 2', 'Class 3'];
  sections = ['A', 'B', 'C'];
  names = ['John', 'Jane', 'Doe'];
  filterForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      class: [''],
      section: [''],
      name: [''],
      gender: ['Male'],
      status: ['Active'],
    });
  }

  addBtnLink: string[] = [TmknAppRoutes.Add];
  courses$: Observable<Course[]> = this.coursesService
    .getList()
    .pipe(map((x) => x));
  loading$: Observable<boolean> = this.courses$.pipe(
    map((x) => x.length === 0)
  );
  pagination$: Observable<Pagination> = of(new Pagination(1));
  coursesMetaData: TmTableMetaData<Course> = {
    columns: [
      {
        columnDef: 'id',
        header: 'Id',
        cell: (element: Course) => `${element.id}`,
        type: 'link',
      },
      {
        columnDef: 'title',
        header: 'Title',
        cell: (element: Course) => `${element.title}`,
      },
      {
        columnDef: 'secondLevel',
        header: 'Second Level',
        cell: (element: Course) => `${element.secondLevel}`,
      },
      {
        columnDef: 'teacher',
        header: 'Teacher',
        cell: (element: Course) => `${element.teacher}`,
      },
      {
        columnDef: 'class',
        header: 'Class',
        cell: (element: Course) => `${element.class}`,
      },
      {
        columnDef: 'active',
        header: 'Active',
        cell: (element: Course) => `${element.active ? 'Yes' : 'No'}`,
        type: 'highlighted',
        highlightedLogic: (element: Course) => {
          return element.active ? 'green' : 'red';
        },
      },
      {
        columnDef: 'accepted',
        header: 'Accepted',
        cell: (element: Course) => `${element.accepted ? 'Yes' : 'No'}`,
        type: 'highlighted',
        highlightedLogic: (element: Course) => {
          return element.accepted ? 'green' : 'red';
        },
      },
      {
        columnDef: 'showHomePage',
        header: 'Show in home page',
        cell: (element: Course) => `${element.showHomePage ? 'Yes' : 'No'}`,
        type: 'highlighted',
        highlightedLogic: (element: Course) => {
          return element.showHomePage ? 'green' : 'red';
        },
      },
    ],
    actions: [
      {
        icon: 'ti ti-eye',
        color: 'primary',
        title: 'Show details',
        action: () => {},
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-edit',
        color: 'accent',
        title: 'Edit',
        action: (element: Course) => this._edit(element),
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-trash',
        color: 'warn',
        title: 'Delete',
        action: (element: Course) => this._delete(element),
        visibleCondition: () => true,
      },
    ],
    otherActions: [],
  };

  resetFilters() {
    this.filterForm.reset({
      class: '',
      section: '',
      name: '',
      gender: 'Male',
      status: 'Active',
    });
  }

  applyFilters() {
    console.log(this.filterForm.value);
  }

  onClickPrevButton() {
    this.navigationManagerService.navigateBack();
  }

  private _edit = (course: Course) => {
    this.router.navigate([
      `${TmknAppRoutes.Dashboard}//${TmknAppRoutes.CourseManagement}/${TmknAppRoutes.Edit}`,
      course.id,
    ]);
  };

  private _delete = (course: Course) => {
    this.confirmationDialogService
      .openConfirmDialog({
        title: 'Delete course',
        message: 'Are you sure you want to delete course?',
        submitTitle: 'Yes',
        discardTitle: 'No',
        dialogType: TmDialogType.Delete,
      })
      .subscribe(async (value) => {
        if (value) {
          this.courses$ = this.coursesService.delete(course.id);
        }
      });
  };

  updateSelectedRows(rows: any[]) {
    this.selectedRows = rows; // Update selected rows
  }
}
