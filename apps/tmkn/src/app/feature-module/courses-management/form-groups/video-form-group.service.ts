import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormGroupService } from '@tmkn/core';
import { LectureVideo } from '../model/lecture-video.model';

@Injectable({ providedIn: 'root' })
export class LectureVideoFormGroupService extends BaseFormGroupService<LectureVideo> {
  constructor(private fb: FormBuilder) {
    super();
  }

  protected build(initialValue?: LectureVideo): FormGroup {
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
      active: new FormControl<boolean | undefined>(initialValue?.active, {
        validators: [Validators.required],
      }),
      video: new FormControl<string | undefined>(initialValue?.video, {
        validators: [Validators.required],
      }),
    });
    return fg;
  }
}
