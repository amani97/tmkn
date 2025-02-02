import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import { ExamAttendanceComponent } from './exam-attendance/exam-attendance.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamResultsComponent } from './exam-results/exam-results.component';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { ExaminationsComponent } from './examinations.component';
import { ExaminationsRoutingModule } from './examinations-routing.module';
import { GradeComponent } from './grade/grade.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {AnswerFormGroupService, QuestionFormGroupService} from '../courses-management/form-groups/question-from-group.service';
import {QuizFormGroupService} from '../courses-management/form-groups/quiz-form-group.service';

@NgModule({
  declarations: [
    ExaminationsComponent,
    GradeComponent,
    ExamListComponent,
    ExamScheduleComponent,
    ExamAttendanceComponent,
    ExamResultsComponent,
  ],
  imports: [
    CommonModule,
    ExaminationsRoutingModule,
    SharedModule,
    DropdownModule,
  ],
   providers: [
      QuestionFormGroupService,
      AnswerFormGroupService,
      QuizFormGroupService,
    ],
})
export class ExaminationsModule {}
