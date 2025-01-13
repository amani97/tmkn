import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavigationManagerService } from '@tmkn/core';
import { Pagination, TmDialogType } from '@tmkn/ui';
import { TmknAppRoutes } from 'apps/tmkn/src/app/shared/config';
import { TmTableMetaData } from 'libs/shared/ui/src/lib/components/table/models';
import { map, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { QuestionsFormDialogComponent } from '../../../components/questions-form-dialog/questions-form-dialog.component';
import { SubCoursesService } from 'apps/tmkn/src/app/feature-module/courses-management/data/sub-courses.service';
import { LecturesService } from 'apps/tmkn/src/app/feature-module/courses-management/data/lectures.service';
import { MediaContentsService } from 'apps/tmkn/src/app/feature-module/courses-management/data/media-contents.service';
import { Lecture } from 'apps/tmkn/src/app/feature-module/courses-management/model/lecture.model';
import { SubCourse } from 'apps/tmkn/src/app/feature-module/courses-management/model/sub-course.model';
import { MediaContent } from 'apps/tmkn/src/app/feature-module/courses-management/model/media-content.model';
import { CourseManagementType } from 'apps/tmkn/src/app/shared/enums/course-management-type.enum';
import { MediaContentType } from 'apps/tmkn/src/app/shared/enums/media-content-type.enum';
import { VideoFormDialogComponent } from '../../../components/video-form-dialog/video-form-dialog.component';
import { VideoStreamsFormDialogComponent } from '../../../components/video-streams-form-dialog/video-streams-form-dialog.component';
import { NoteFormDialogComponent } from '../../../components/note-form-dialog/note-form-dialog.component';
import { OtherFileFormDialogComponent } from '../../../components/other-file-dialog/other-file-dialog.component';
import { PaperNoteFormDialogComponent } from '../../../components/paper-note-form-dialog/paper-note-form-dialog.component';
import { ServiceFormDialogComponent } from '../../../components/service-form-dialog/service-form-dialog.component';
import { SubCourseFormDialogComponent } from '../../../components/sub-course-form-dialog/sub-course-form-dialog.component';
import { TmConfirmationDialogService } from 'libs/shared/ui/src/lib/components/dialog/services/confirmation-dialog.service';
import { QuizFormDialogComponent } from '../../../components/quiz-form-dialog/quiz-form-dialog.component';
import { LectureFormDialogComponent } from '../../../components/lecture-form-dialog/lecture-form-dialog.component';

@Component({
  selector: 'app-sub-courses-list',
  standalone: false,
  templateUrl: './sub-courses-list.component.html',
  styleUrl: './sub-courses-list.component.scss',
})
export class SubCoursesListComponent {
  private readonly navigationManagerService = inject(INavigationManagerService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly subCoursesService = inject(SubCoursesService);
  private readonly lecturesService = inject(LecturesService);
  private readonly mediaContentsService = inject(MediaContentsService);
  private readonly confirmationDialogService = inject(
    TmConfirmationDialogService
  );

  addBtnLink: string[] = [
    TmknAppRoutes.Empty,
    TmknAppRoutes.Dashboard,
    TmknAppRoutes.Courses,
    TmknAppRoutes.Add,
  ];
  subCourses$: Observable<SubCourse[]> =
    this.subCoursesService.getList() as Observable<SubCourse[]>;
  loading$: Observable<boolean> = this.subCourses$.pipe(
    map((x) => x.length === 0)
  );
  pagination$!: Observable<Pagination>;
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
        action: (element: SubCourse) => this._edit(element),
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-trash',
        color: 'warn',
        title: 'Delete',
        action: (element: SubCourse) => this._delete(element),
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

  mediaContentData: TmTableMetaData<MediaContent> = {
    columns: [
      {
        columnDef: 'id',
        header: 'Id',
        cell: (element: MediaContent) => `${element.id}`,
        type: 'link',
      },
      {
        columnDef: 'title',
        header: 'Title',
        cell: (element: MediaContent) => `${element.title}`,
      },
      {
        columnDef: 'description',
        header: 'Description',
        cell: (element: MediaContent) => `${element.description}`,
      },
      {
        columnDef: 'type',
        header: 'Type',
        cell: (element: MediaContent) =>
          `${this.handleMediaContentType(element.type)}`,
      },
    ],
    actions: [
      {
        icon: 'ti ti-question-mark',
        color: 'primary',
        title: 'Add Question',
        action: (element: MediaContent) => this._addQuestion(element),
        visibleCondition: (element: MediaContent) => {
          return element.type === MediaContentType.Quiz;
        },
      },
      {
        icon: 'ti ti-edit',
        color: 'accent',
        title: 'Edit',
        action: (element: MediaContent) => this._editMediaContent(element),
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-trash',
        color: 'warn',
        title: 'Delete',
        action: (element: MediaContent) => this._deleteMedia(element),
        visibleCondition: () => true,
      },
    ],
    otherActions: [],
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

  handleMediaContentType(type: MediaContentType) {
    switch (type) {
      case MediaContentType.Videos:
        return 'Video';
      case MediaContentType.Notes:
        return 'Notes';
      case MediaContentType.OtherFiles:
        return 'Other Files';
      case MediaContentType.Quiz:
        return 'Quiz';
      case MediaContentType.VideoStreams:
        return 'Video Stream';
      default:
        return type;
    }
  }

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

  onClickPrevButton() {
    this.navigationManagerService.navigateBack();
  }

  fetchChildData = (parent: any, level: string): Observable<any[]> => {
    // TODO: Use Parent when start to use real API
    if (level === 'two') {
      return this.lecturesService.getList();
    } else if (level === 'three') {
      return this.mediaContentsService.getList();
    }
    return of([]);
  };

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

  private _addQuestion = (course: MediaContent) => {
    this.dialog.open(QuestionsFormDialogComponent, {
      minWidth: '95vw',
      minHeight: '80vh',
      disableClose: true,
      data: {
        id: course.id,
      },
    });
  };

  private _edit = (course: SubCourse) => {
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

  private _editMediaContent = (mediaContent: MediaContent) => {
    switch (mediaContent.type) {
      case MediaContentType.Videos:
        this._addVideo(mediaContent);
        break;
      case MediaContentType.VideoStreams:
        this._addVideoStream(mediaContent);
        break;
      case MediaContentType.Notes:
        this._addNote(mediaContent);
        break;
      case MediaContentType.OtherFiles:
        this._addOtherFile(mediaContent);
        break;
      case MediaContentType.Quiz:
        this._addQuiz(mediaContent);
        break;

      default:
        return;
    }
  };

  private _delete = (item: SubCourse) => {
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

  private _deleteMedia = (item: MediaContent) => {
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
          this.mediaContentsService.delete(item.id);
          this.fetchChildData(null, 'three').subscribe();
        }
      });
  };
}
