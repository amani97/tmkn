import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { Pagination, TmDialogType } from '@tmkn/ui';

import { Course } from 'apps/tmkn/src/app/feature-module/courses-management/model/course.model';
import { CourseManagementType } from 'apps/tmkn/src/app/shared/enums/course-management-type.enum';
import { CoursesService } from 'apps/tmkn/src/app/feature-module/courses-management/data/courses.service';
import { INavigationManagerService } from '@tmkn/core';
import { Lecture } from '../../../model/lecture.model';
import { LectureFormDialogComponent } from '../../../components/lecture-form-dialog/lecture-form-dialog.component';
import { LecturesService } from '../../../data/lectures.service';
import { MatDialog } from '@angular/material/dialog';
import { NoteFormDialogComponent } from '../../../components/note-form-dialog/note-form-dialog.component';
import { OtherFileFormDialogComponent } from '../../../components/other-file-dialog/other-file-dialog.component';
import { PaperNoteFormDialogComponent } from '../../../components/paper-note-form-dialog/paper-note-form-dialog.component';
import { QuestionsFormDialogComponent } from '../../../components/questions-form-dialog/questions-form-dialog.component';
import { QuizFormDialogComponent } from '../../../components/quiz-form-dialog/quiz-form-dialog.component';
import { Router } from '@angular/router';
import { ServiceFormDialogComponent } from '../../../components/service-form-dialog/service-form-dialog.component';
import { SubCourse } from '../../../model/sub-course.model';
import { SubCourseFormDialogComponent } from '../../../components/sub-course-form-dialog/sub-course-form-dialog.component';
import { SubCoursesService } from '../../../data/sub-courses.service';
import { TmConfirmationDialogService } from 'libs/shared/ui/src/lib/components/dialog/services/confirmation-dialog.service';
import { TmTableMetaData } from 'libs/shared/ui/src/lib/components/table/models';
import { TmknAppRoutes } from 'apps/tmkn/src/app/shared/config';
import { VideoFormDialogComponent } from '../../../components/video-form-dialog/video-form-dialog.component';
import { VideoStreamsFormDialogComponent } from '../../../components/video-streams-form-dialog/video-streams-form-dialog.component';
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
  private readonly subCoursesService = inject(SubCoursesService);
  private readonly lecturesService = inject(LecturesService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

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
  subCourses$: Observable<SubCourse[]> =
    this.subCoursesService.getList() as Observable<SubCourse[]>;
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
  selectedColumns = [...this.coursesMetaData.columns];
  subCoursesMetaData: TmTableMetaData<SubCourse> = {
    columns: [
      {
        columnDef: 'id',
        header: 'Id',
        cell: (element: SubCourse) => `${element.id}`,
      },
      {
        columnDef: 'title',
        header: 'Title',
        cell: (element: SubCourse) => `${element.title}`,
      },
      {
        columnDef: 'price',
        header: 'Price',
        cell: (element: SubCourse) => `${element.price}`,
      },
      {
        columnDef: 'priceAfterDiscount',
        header: 'Price After Discount',
        cell: (element: SubCourse) => `${element.priceAfterDiscount}`,
      },
      {
        columnDef: 'activeAttendee',
        header: 'Attendee',
        cell: (element: SubCourse) =>
          `${element.activeAttendee ? 'Active' : 'Disable'}`,
      },
      {
        columnDef: 'type',
        header: 'Type',
        cell: (element: SubCourse) =>
          `${this.handleCourseManagementType(element.type)}`,
      },
    ],
    actions: [
      {
        icon: 'ti ti-books',
        color: 'primary',
        title: 'Add Lecture',
        action: (element: SubCourse) => this.openLectureDialog(element.id),
        visibleCondition: (element: SubCourse) =>
          element.type === CourseManagementType.SubCourses ||
          element.type === CourseManagementType.Service
            ? true
            : false,
      },

      {
        icon: 'ti ti-edit',
        color: 'accent',
        title: 'Edit',
        action: (element: SubCourse) => this._editSubCourse(element),
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-trash',
        color: 'warn',
        title: 'Delete',
        action: (element: SubCourse) => this._deleteSubCourse(element),
        visibleCondition: () => true,
      },
    ],
    otherActions: [],
  };

  lectureMetaData: TmTableMetaData<Lecture> = {
    columns: [
      {
        columnDef: 'id',
        header: 'Id',
        cell: (element: Lecture) => `${element.id}`,
        type: 'link',
      },
      {
        columnDef: 'title',
        header: 'Title',
        cell: (element: Lecture) => `${element.title}`,
      },
      {
        columnDef: 'price',
        header: 'Price',
        cell: (element: Lecture) => `${element.price}`,
      },
      {
        columnDef: 'availableForSale',
        header: 'Available for sale',
        cell: (element: Lecture) =>
          `${element.availableForSale ? 'Yes' : 'No'}`,
        type: 'highlighted',
        highlightedLogic: (element: Lecture) =>
          element.availableForSale ? 'green' : 'red',
      },
      {
        columnDef: 'active',
        header: 'Active',
        cell: (element: Lecture) =>
          `${element.availableForSale ? 'Yes' : 'No'}`,
        type: 'highlighted',
        highlightedLogic: (element: Lecture) =>
          element.active ? 'green' : 'red',
      },
      {
        columnDef: 'goldenLecture',
        header: 'Golden Lecture',
        cell: (element: Lecture) => `${element.goldenLecture ? 'Yes' : 'No'}`,
        type: 'highlighted',
        highlightedLogic: (element: Lecture) =>
          element.goldenLecture ? 'green' : 'red',
      },
    ],
    actions: [
      {
        icon: 'ti ti-edit',
        color: 'accent',
        title: 'Edit',
        action: (element: Lecture) =>
          this.openLectureDialog(null as any, element.id),
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-trash',
        color: 'warn',
        title: 'Delete',
        action: (element: Lecture) => this._deleteLecture(element),
        visibleCondition: () => true,
      },
    ],
    otherActions: [
      {
        icon: 'ti ti-video',
        color: 'primary',
        title: 'Add Video',
        action: (element: Lecture) => this._addVideo(element),
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-cast',
        color: 'primary',
        title: 'Add Video Stream',
        action: (element: Lecture) => this._addVideoStream(element),
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-note',
        color: 'primary',
        title: 'Add Note',
        action: (element: Lecture) => this._addNote(element),
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-question-mark',
        color: 'primary',
        title: 'Add Quiz',
        action: (element: Lecture) => this._addQuiz(element),
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-file',
        color: 'primary',
        title: 'Add Other File',
        action: (element: Lecture) => this._addOtherFile(element),
        visibleCondition: () => true,
      },
    ],
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

  toggleColumn(column: any, event: any) {
    if (event.checked) {
      this.selectedColumns.push(column);
    } else {
      this.selectedColumns = this.selectedColumns.filter(
        (col) => col.columnDef !== column.columnDef
      );
    }
  }

  private _addQuiz = (lecture: any) => {
    this.dialog.open(QuizFormDialogComponent, {
      minWidth: '95vw',
      minHeight: '80vh',
      disableClose: true,
      data: {
        id: lecture.id,
      },
    });
  };

  private _addVideo = (lecture: any) => {
    this.dialog
      .open(VideoFormDialogComponent, {
        minWidth: '95vw',
        minHeight: '80vh',
        disableClose: true,
        data: {
          id: lecture.id,
        },
      })
      .afterClosed()
      .subscribe((data) => this.fetchChildData(null, 'three'));
  };

  private _addVideoStream = (lecture: any) => {
    this.dialog.open(VideoStreamsFormDialogComponent, {
      minWidth: '95vw',
      minHeight: '80vh',
      disableClose: true,
      data: {
        id: lecture.id,
      },
    });
  };

  private _addNote = (lecture: any) => {
    this.dialog.open(NoteFormDialogComponent, {
      minWidth: '95vw',
      minHeight: '80vh',
      disableClose: true,
      data: {
        id: lecture.id,
      },
    });
  };

  private _addOtherFile = (lecture: any) => {
    this.dialog.open(OtherFileFormDialogComponent, {
      minWidth: '95vw',
      minHeight: '80vh',
      disableClose: true,
      data: {
        id: lecture.id,
      },
    });
  };

  handleCourseManagementType(type: CourseManagementType) {
    switch (type) {
      case CourseManagementType.SubCourses:
        return 'Sub Course';
      case CourseManagementType.Service:
        return 'service';
      case CourseManagementType.PaperNote:
        return 'Paper Note';
      default:
        return type;
    }
  }

  openLectureDialog(relatedId: number, lectureId?: number) {
    this.dialog
      .open(LectureFormDialogComponent, {
        minWidth: '70vw',
        data: {
          relatedId,
          id: lectureId,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.fetchChildData(null, 'two');
      });
  }

  fetchChildData = (parent: any, level: string): Observable<any[]> => {
    // TODO: Use Parent when start to use real API
    if (level === 'two') {
      return this.subCoursesService.getList();
    } else if (level === 'three') {
      return this.lecturesService.getList();
    }
    return of([]);
  };

  private _deleteLecture = (item: Lecture) => {
    this.confirmationDialogService
      .openConfirmDialog({
        title: 'Delete item',
        message: 'Are you sure you want to delete this item?',
        submitTitle: 'Yes',
        discardTitle: 'No',
        dialogType: TmDialogType.Delete,
      })
      .subscribe(async (value) => {
        if (value) {
          this.lecturesService.delete(item.id);
          this.fetchChildData(null, 'two');
        }
      });
  };

  private _deleteSubCourse = (item: SubCourse) => {
    this.confirmationDialogService
      .openConfirmDialog({
        title: 'Delete item',
        message: 'Are you sure you want to delete this item?',
        submitTitle: 'Yes',
        discardTitle: 'No',
        dialogType: TmDialogType.Delete,
      })
      .subscribe(async (value) => {
        if (value) {
          this.subCourses$ = this.subCoursesService.delete(
            item.id
          ) as Observable<SubCourse[]>;
        }
      });
  };

  private _editSubCourse = (course: SubCourse) => {
    switch (course.type) {
      case CourseManagementType.SubCourses:
        this.openSubCourseDialog(course.id);
        break;
      case CourseManagementType.Service:
        this.openServiceDialog(course.id);
        break;
      case CourseManagementType.PaperNote:
        this.openPaperNoteDialog(course.id);
        break;
      default:
        return;
    }
  };

  openSubCourseDialog(id?: number) {
    this.dialog
      .open(SubCourseFormDialogComponent, {
        minWidth: '70vw',
        data: {
          id,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.subCourses$ = this.subCoursesService.getList() as Observable<
          SubCourse[]
        >;
      });
  }

  openServiceDialog(id?: number) {
    this.dialog
      .open(ServiceFormDialogComponent, {
        minWidth: '70vw',
        data: {
          id,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.subCourses$ = this.subCoursesService.getList() as Observable<
          SubCourse[]
        >;
      });
  }

  openPaperNoteDialog(id?: number) {
    this.dialog
      .open(PaperNoteFormDialogComponent, {
        minWidth: '70vw',
        data: {
          id,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.subCourses$ = this.subCoursesService.getList() as Observable<
          SubCourse[]
        >;
      });
  }
  open() {
    this.dialog.open(QuestionsFormDialogComponent);
  }
}
