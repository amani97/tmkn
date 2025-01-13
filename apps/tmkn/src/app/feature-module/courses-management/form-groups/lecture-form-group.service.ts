import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormGroupService } from '@tmkn/core';
import { Lecture } from '../model/lecture.model';

@Injectable({ providedIn: 'root' })
export class LectureFormGroupService extends BaseFormGroupService<Lecture> {
  constructor(private fb: FormBuilder) {
    super();
  }

  protected build(initialValue?: Lecture): FormGroup {
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
      descriptionAr: new FormControl<string | undefined>(
        initialValue?.descriptionAr,
        {
          validators: [Validators.required],
        }
      ),
      price: new FormControl<number | undefined>(initialValue?.price, {
        validators: [Validators.required],
      }),
      active: new FormControl<boolean | undefined>(initialValue?.active, {
        validators: [Validators.required],
      }),
      availableForSale: new FormControl<boolean | undefined>(
        initialValue?.availableForSale,
        {
          validators: [Validators.required],
        }
      ),
      goldenLecture: new FormControl<boolean | undefined>(
        initialValue?.goldenLecture,
        {
          validators: [Validators.required],
        }
      ),
    });
    return fg;
  }
}
