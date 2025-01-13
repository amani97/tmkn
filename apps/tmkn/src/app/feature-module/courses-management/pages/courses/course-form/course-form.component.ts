import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { INavigationManagerService } from '@tmkn/core';
import { CoursesService } from 'apps/tmkn/src/app/feature-module/courses-management/data/courses.service';
import { DynamicFormField } from 'libs/shared/ui/src/lib/components/form-field/models/dtos/form-field.dto';
import { CourseFormGroupService } from '../../../form-groups/course-form-group.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-course-form',
  standalone: false,

  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  private readonly navigationManagerService = inject(INavigationManagerService);
  private translateService = inject(TranslateService);
  private activatedRoute = inject(ActivatedRoute);
  private coursesService = inject(CoursesService);
  private courseFormGroupService = inject(CourseFormGroupService);
  private router = inject(Router);

  isEditMode = false;
  courseFg!: FormGroup;

  firstLevelOptions = [
    { key: 'First Level 1', value: 'firstLevel1' },
    { key: 'First Level 2', value: 'firstLevel1' },
  ];

  secondLevelOptions = [
    { key: 'Second Level 1.1', value: 'secondLevel11' },
    { key: 'Second Level 1.2', value: 'secondLevel12' },
    { key: 'Second Level 2.1', value: 'secondLevel21' },
    { key: 'Second Level 2.2', value: 'secondLevel21' },
  ];

  thirdLevelOptions = [
    { key: 'Third Level 1.1.1', value: 'thirdLevel111' },
    { key: 'Third Level 1.1.2', value: 'thirdLevel112' },
  ];

  teacherOptions = [
    { key: 'Teacher 1', value: 'teacher1' },
    { key: 'Teacher 2', value: 'teacher2' },
  ];

  classOptions = [
    { key: 'Class 1', value: 'class1' },
    { key: 'Class 2', value: 'class2' },
  ];

  async ngOnInit(): Promise<void> {
    const courseId = this.activatedRoute.snapshot.params['courseId'];
    if (courseId) {
      this.isEditMode = true;
      await this.loadEditForm(courseId);
    } else {
      this.courseFg = this.courseFormGroupService.initialize();
    }

    this.courseFg?.get('firstLevel')?.valueChanges.subscribe((value) => {
      if (value) {
        this.courseFg?.get('secondLevel')?.enable();
      } else {
        this.courseFg?.get('secondLevel')?.disable();
      }
      this.courseFg.updateValueAndValidity();
    });

    this.courseFg?.get('secondLevel')?.valueChanges.subscribe((value) => {
      if (value) {
        this.courseFg?.get('thirdLevel')?.enable();
      } else {
        this.courseFg?.get('thirdLevel')?.disable();
      }
      this.courseFg.updateValueAndValidity();
    });
  }

  async loadEditForm(courseId: number) {
    const course = await lastValueFrom(this.coursesService.getById(courseId));
    this.courseFg = this.courseFormGroupService.initialize(course);
  }

  onClickPrevButton() {
    this.navigationManagerService.navigateBack();
  }

  onSubmit() {
    const course = this.courseFormGroupService.getValue();
    this.coursesService.create(course).subscribe();
    this.router.navigate(['dashboard/course-management']);
  }
}
