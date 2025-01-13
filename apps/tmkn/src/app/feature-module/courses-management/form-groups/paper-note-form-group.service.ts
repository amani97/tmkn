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
import { PaperNote } from '../model/paper-note.model';

@Injectable({ providedIn: 'root' })
export class PaperNoteFormGroupService extends BaseFormGroupService<PaperNote> {
  constructor(private fb: FormBuilder) {
    super();
  }

  protected build(initialValue?: PaperNote): FormGroup {
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
      description: new FormControl<string | undefined>(initialValue?.description, {
        validators: [Validators.required],
      }),
      descriptionAr: new FormControl<string | undefined>(initialValue?.descriptionAr, {
        validators: [Validators.required],
      }),
      price: new FormControl<number | undefined>(initialValue?.price, {
        validators: [Validators.required],
      }),
      image: new FormControl<string | undefined>(initialValue?.image, {
        validators: [Validators.required],
      }),
    });
    return fg;
  }
}
