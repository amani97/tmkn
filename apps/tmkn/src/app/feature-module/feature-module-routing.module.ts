import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureModuleComponent } from './feature-module.component';
import { AdminDashboardComponent } from './main/dashboard/admin-dashboard/admin-dashboard.component';
import { TmknAppRoutes } from '../shared/config';

const routes: Routes = [
  {
    path: TmknAppRoutes.Empty,
    component: FeatureModuleComponent,
    children: [
      {
        path: TmknAppRoutes.Empty,
        redirectTo: TmknAppRoutes.Dashboard,
        pathMatch: 'full',
      },
      {
        path: TmknAppRoutes.Dashboard,
        component: AdminDashboardComponent,
      },
      {
        path: TmknAppRoutes.Dashboard,
        loadChildren: () =>
          import('./main/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        data: {
          breadcrumb: 'breadcrumb.dashboard',
        },
      },
      {
        path: `${TmknAppRoutes.Dashboard}/${TmknAppRoutes.CourseManagement}`,
        loadChildren: () =>
          import('./courses-management/courses-management.module').then(
            (m) => m.CoursesManagementModule
          ),
        data: {
          breadcrumb: 'Course Management',
        },
      },
      { path: 'layout-mini', component: AdminDashboardComponent },
      { path: 'layout-default', component: AdminDashboardComponent },

      { path: 'layout-box', component: AdminDashboardComponent },
      { path: 'layout-dark', component: AdminDashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureModuleRoutingModule {}
