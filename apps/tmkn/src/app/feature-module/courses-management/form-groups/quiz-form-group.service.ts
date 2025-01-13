import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormGroupService, IFormArrayService } from '@tmkn/core';
import { QuizModel } from '../model/question.model';
import { QuestionFormGroupService } from './question-from-group.service';

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
      duration: new FormControl<number | undefined>(initialValue?.duration, {
        validators: [Validators.required],
      }),
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
    if (initialValue?.questions && initialValue?.questions.length > 0) {
      initialValue?.questions.forEach((question) => {
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
