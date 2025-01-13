import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormGroupService } from '@tmkn/core';
import { Course } from 'apps/tmkn/src/app/feature-module/courses-management/model/course.model';

@Injectable({ providedIn: 'root' })
export class CourseFormGroupService extends BaseFormGroupService<Course> {
  constructor(private fb: FormBuilder) {
    super();
  }

  protected build(initialValue?: Course): FormGroup {
    const fg = this.fb.group({
      title: new FormControl<string | undefined>(initialValue?.title, {
        validators: [Validators.required],
      }),
      titleAr: new FormControl<string | undefined>(initialValue?.titleAr),
      description: new FormControl<string | undefined>(
        initialValue?.description,
        {
          validators: [Validators.required],
        }
      ),
      descriptionAr: new FormControl<string | undefined>(
        initialValue?.descriptionAr
      ),
      firstLevel: new FormControl<string | undefined>(
        initialValue?.firstLevel,
        {
          validators: [Validators.required],
        }
      ),
      secondLevel: new FormControl<string | undefined>(
        { value: initialValue?.secondLevel, disabled: !initialValue?.firstLevel? true : false },
        {
          validators: [Validators.required],
        }
      ),
      thirdLevel: new FormControl<string | undefined>(
        { value: initialValue?.thirdLevel, disabled: !initialValue?.secondLevel? true : false },
        {
          validators: [Validators.required],
        }
      ),
      teacher: new FormControl<string | undefined>(initialValue?.teacher, {
        validators: [Validators.required],
      }),
      class: new FormControl<string | undefined>(initialValue?.class, {
        validators: [Validators.required],
      }),
      whatsappGroupLink: new FormControl<string | undefined>(
        initialValue?.whatsappGroupLink
      ),
      price: new FormControl<number | undefined>(initialValue?.price, {
        validators: [Validators.required],
      }),
      priceAfterDiscount: new FormControl<number | undefined>(
        initialValue?.priceAfterDiscount
      ),
      active: new FormControl<boolean | undefined>(initialValue?.active),
      accepted: new FormControl<boolean | undefined>(initialValue?.accepted),
      showAtHomePage: new FormControl<boolean | undefined>(
        initialValue?.showHomePage
      ),
      showAtStoreNotes: new FormControl<boolean | undefined>(
        initialValue?.showAtStoreNotes
      ),
      availableForSale: new FormControl<boolean | undefined>(
        initialValue?.availableForSale
      ),
    });
    return fg;
  }
}
