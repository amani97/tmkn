import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormGroupService } from '@tmkn/core';
import { ServiceCourse } from '../model/service-course.model';
import { CourseManagementType } from '../../../shared/enums/course-management-type.enum';

@Injectable({ providedIn: 'root' })
export class ServiceFormGroupService extends BaseFormGroupService<ServiceCourse> {
  constructor(private fb: FormBuilder) {
    super();
  }

  protected build(initialValue?: ServiceCourse): FormGroup {
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
      description: new FormControl<string | undefined>(
        initialValue?.description,
        {
          validators: [Validators.required],
        }
      ),
      descriptionAr: new FormControl<string | undefined>(
        initialValue?.descriptionAr,
        {
          validators: [Validators.required],
        }
      ),
      price: new FormControl<number | undefined>(initialValue?.price, {
        validators: [Validators.required],
      }),
      priceOutCourse: new FormControl<number | undefined>(
        initialValue?.priceOutCourse,
        {
          validators: [Validators.required],
        }
      ),
      active: new FormControl<boolean | undefined>(initialValue?.active, {
        validators: [Validators.required],
      }),
      availableForSale: new FormControl<boolean | undefined>(
        initialValue?.availableForSale,
        {
          validators: [Validators.required],
        }
      ),
      type: new FormControl<CourseManagementType | undefined>(
        initialValue?.type,
        {
          validators: [Validators.required],
        }
      )
    });
    return fg;
  }
}
