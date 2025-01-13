import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormGroupService } from '@tmkn/core';
import { LectureNote } from '../model/note.model';
import { MediaContentType } from '../../../shared/enums/media-content-type.enum';

@Injectable({ providedIn: 'root' })
export class NoteFormGroupService extends BaseFormGroupService<LectureNote> {
  constructor(private fb: FormBuilder) {
    super();
  }

  protected build(initialValue?: LectureNote): FormGroup {
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
      file: new FormControl<string | undefined>(initialValue?.file, {
        validators: [Validators.required],
      }),
      isActive: new FormControl<boolean | undefined>(initialValue?.isActive, {
        validators: [Validators.required],
      }),
      isShareable: new FormControl<boolean | undefined>(
        initialValue?.isShareable,
        {
          validators: [Validators.required],
        }
      ),
      type: new FormControl<MediaContentType | undefined>(initialValue?.type, {
        validators: [Validators.required],
      }),
    });
    return fg;
  }
}
