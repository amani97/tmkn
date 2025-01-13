import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TmknAppRoutes } from '../../shared/config';
import { CoursesListComponent } from './pages/courses/courses-list/courses-list.component';
import { CourseFormComponent } from './pages/courses/course-form/course-form.component';
import { SubCoursesListComponent } from './pages/sub-courses/sub-courses-list/sub-courses-list.component';
import { CoursesManagementContainerComponent } from './components/courses-management-container/courses-management-container.component';

const COURSE_MANAGEMENT_PAGES = [
  {
    path: TmknAppRoutes.Empty,
    component: CourseFormComponent,
  },
  // Sub Courses
  {
    path: `${TmknAppRoutes.SubCourses}`,
    component: SubCoursesListComponent,
  },
];
const routes: Routes = [
  {
    path: TmknAppRoutes.Empty,
    component: CoursesListComponent,
    data: {
      breadcrumb: 'breadcrumb.courses-list',
    },
  },
  { path: TmknAppRoutes.Add, component: CourseFormComponent },
  {
    path: `${TmknAppRoutes.Edit}/:courseId`,
    component: CoursesManagementContainerComponent,
    children: COURSE_MANAGEMENT_PAGES,
    data: {
      breadcrumb: 'Edit Course',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesManagementRoutingModule {}
