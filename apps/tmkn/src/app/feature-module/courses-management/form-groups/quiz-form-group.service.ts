import { BaseFormGroupService, IFormArrayService } from '@tmkn/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Injectable } from '@angular/core';
import { QuestionFormGroupService } from './question-from-group.service';
import { QuizModel } from '../model/question.model';

@Injectable()
export class QuizFormGroupService extends BaseFormGroupService<QuizModel> {
  constructor(
    private fb: FormBuilder,
    private formArrayService: IFormArrayService,
    private questionFormGroupService: QuestionFormGroupService
  ) {
    super();
  }

  protected build(initialValue?: QuizModel): FormGroup {
    const fg = this.fb.group({
      class: new FormControl<string | undefined>(initialValue?.class, {
        validators: [Validators.required],
      }),
      section: new FormControl<string | undefined>(initialValue?.section, {
        validators: [Validators.required],
      }),
      examName: new FormControl<string | undefined>(initialValue?.examName, {
        validators: [Validators.required],
      }),
      startTime: new FormControl<string | undefined>(initialValue?.startTime, {
        validators: [Validators.required],
      }),
      endTime: new FormControl<string | undefined>(initialValue?.endTime, {
        validators: [Validators.required],
      }),
      duration: new FormControl<number | undefined>(initialValue?.duration, {
        validators: [Validators.required],
      }),
      examDate: new FormControl<string | undefined>(initialValue?.examDate, {
        validators: [Validators.required],
      }),
      subject: new FormControl<string | undefined>(initialValue?.subject, {
        validators: [Validators.required],
      }),
      roomNo: new FormControl<number | undefined>(initialValue?.roomNo, {
        validators: [Validators.required],
      }),
      maxMarks: new FormControl<number | undefined>(initialValue?.maxMarks, {
        validators: [Validators.required],
      }),
      minMarks: new FormControl<number | undefined>(initialValue?.minMarks, {
        validators: [Validators.required],
      }),
      title: new FormControl<string | undefined>(initialValue?.title, {
        validators: [Validators.required],
      }),
      description: new FormControl<string | undefined>(
        initialValue?.description,
        {
          validators: [Validators.required],
        }
      ),
      titleAr: new FormControl<string | undefined>(initialValue?.titleAr),
      descriptionAr: new FormControl<string | undefined>(
        initialValue?.descriptionAr
      ),
      minimumPassingScores: new FormControl<number | undefined>(
        initialValue?.minimumPassingScores,
        {
          validators: [Validators.required],
        }
      ),
    
      isRandomize: new FormControl<boolean | undefined>(
        initialValue?.isRandomize,
        {
          validators: [Validators.required],
        }
      ),
      file: new FormControl<string | undefined>(initialValue?.file, {
        validators: [Validators.required],
      }),
      isShareable: new FormControl<boolean | undefined>(
        initialValue?.isShareable,
        {
          validators: [Validators.required],
        }
      ),
      questions: this.fb.array([]),
    });

    if (initialValue?.questions && initialValue.questions.length > 0) {
      initialValue.questions.forEach((question) => {
        this.formArrayService.addItemToFormArray(
          'questions',
          fg,
          this.questionFormGroupService.initialize(question)
        );
      });
    }

    return fg;
  }
}
