import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesManagementRoutingModule } from './courses-management-routing.module';
import { CoursesListComponent } from './pages/courses/courses-list/courses-list.component';
import { CourseFormComponent } from './pages/courses/course-form/course-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { SubCoursesListComponent } from './pages/sub-courses/sub-courses-list/sub-courses-list.component';
import { CoursesManagementContainerComponent } from './components/courses-management-container/courses-management-container.component';
import { BriefCourseDetailsComponent } from './components/brief-course-details/brief-course-details.component';
import { LectureFormDialogComponent } from './components/lecture-form-dialog/lecture-form-dialog.component';
import { QuestionsFormDialogComponent } from './components/questions-form-dialog/questions-form-dialog.component';
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import {
  AnswerFormGroupService,
  QuestionFormGroupService,
} from './form-groups/question-from-group.service';
import { QuizFormGroupService } from './form-groups/quiz-form-group.service';
import { VideoFormDialogComponent } from './components/video-form-dialog/video-form-dialog.component';
import { VideoStreamsFormDialogComponent } from './components/video-streams-form-dialog/video-streams-form-dialog.component';
import { NoteFormDialogComponent } from './components/note-form-dialog/note-form-dialog.component';
import { OtherFileFormDialogComponent } from './components/other-file-dialog/other-file-dialog.component';
import { SubCourseFormDialogComponent } from './components/sub-course-form-dialog/sub-course-form-dialog.component';
import { ServiceFormDialogComponent } from './components/service-form-dialog/service-form-dialog.component';
import { PaperNoteFormDialogComponent } from './components/paper-note-form-dialog/paper-note-form-dialog.component';
import { QuizFormDialogComponent } from './components/quiz-form-dialog/quiz-form-dialog.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseFormComponent,
    SubCoursesListComponent,
    CoursesManagementContainerComponent,
    BriefCourseDetailsComponent,
    LectureFormDialogComponent,
    QuestionsFormDialogComponent,
    VideoFormDialogComponent,
    VideoStreamsFormDialogComponent,
    NoteFormDialogComponent,
    OtherFileFormDialogComponent,
    SubCourseFormDialogComponent,
    ServiceFormDialogComponent,
    PaperNoteFormDialogComponent,
    QuizFormDialogComponent,
  ],
  imports: [
    CommonModule,
    CoursesManagementRoutingModule,
    TranslateModule.forChild(),
    SharedModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
  ],
  providers: [
    QuestionFormGroupService,
    AnswerFormGroupService,
    QuizFormGroupService,
  ],
})
export class CoursesManagementModule {}
