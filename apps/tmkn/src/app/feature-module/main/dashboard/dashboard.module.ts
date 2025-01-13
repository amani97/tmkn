import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedModule } from '../../../shared/shared.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        //...
        NgCircleProgressModule.forRoot({
            "radius": 60,
            "space": -10,
            "outerStrokeGradient": true,
            "outerStrokeWidth": 10,
            "outerStrokeColor": "#4882c2",
            "outerStrokeGradientStopColor": "#53a9ff",
            "innerStrokeColor": "#e7e8ea",
            "innerStrokeWidth": 10,
            "title": "UI",
            "animateTitle": false,
            "animationDuration": 1000,
            "showUnits": false,
            "showBackground": false,
            "clockwise": false,
            "startFromZero": false,
            "lazy": true
        }),
        DashboardComponent,
        AdminDashboardComponent,
        ParentDashboardComponent,
        TeacherDashboardComponent,
        StudentDashboardComponent
    ]
})
export class DashboardModule { }
