import { Component, input } from '@angular/core';
import { Course } from 'apps/tmkn/src/app/feature-module/courses-management/model/course.model';

@Component({
  selector: 'app-brief-course-details',
  standalone: false,
  templateUrl: './brief-course-details.component.html',
  styleUrl: './brief-course-details.component.scss',
})
export class BriefCourseDetailsComponent {
  course = input.required<Course>();
}
