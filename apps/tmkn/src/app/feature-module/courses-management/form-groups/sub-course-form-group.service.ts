import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormGroupService } from '@tmkn/core';
import { Course } from 'apps/tmkn/src/app/feature-module/courses-management/model/course.model';
import { SubCourse } from '../model/sub-course.model';
import { CourseManagementType } from '../../../shared/enums/course-management-type.enum';

@Injectable({ providedIn: 'root' })
export class SubCourseFormGroupService extends BaseFormGroupService<SubCourse> {
  constructor(private fb: FormBuilder) {
    super();
  }

  protected build(initialValue?: SubCourse): FormGroup {
    const fg = this.fb.group({
      id: new FormControl<number | undefined>(initialValue?.id, {
        validators: [Validators.required],
      }),
      title: new FormControl<string | undefined>(initialValue?.title, {
        validators: [Validators.required],
      }),
      titleAr: new FormControl<string | undefined>(initialValue?.titleAr, {
        validators: [Validators.required],
      }),
      price: new FormControl<number | undefined>(initialValue?.price, {
        validators: [Validators.required],
      }),
      priceAfterDiscount: new FormControl<number | undefined>(initialValue?.priceAfterDiscount, {
        validators: [Validators.required],
      }),
      activeAttendee: new FormControl<boolean | undefined>(initialValue?.activeAttendee, {
        validators: [Validators.required],
      }),
      type: new FormControl<CourseManagementType | undefined>(initialValue?.type, {
        validators: [Validators.required],
      }),
    });
    return fg;
  }
}
