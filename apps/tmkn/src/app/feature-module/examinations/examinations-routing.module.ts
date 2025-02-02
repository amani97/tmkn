import { RouterModule, Routes } from '@angular/router';

import { ExamAttendanceComponent } from './exam-attendance/exam-attendance.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamResultsComponent } from './exam-results/exam-results.component';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { GradeComponent } from './grade/grade.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ExamListComponent,
    children: [
      {
        path: 'grade',
        component: GradeComponent,
      },
      {
        path: 'exam-list',
        component: ExamListComponent,
      },
      {
        path: 'exam-schedule',
        component: ExamScheduleComponent,
      },
      {
        path: 'exam-attendance',
        component: ExamAttendanceComponent,
      },
      {
        path: 'exam-results',
        component: ExamResultsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationsRoutingModule {}
