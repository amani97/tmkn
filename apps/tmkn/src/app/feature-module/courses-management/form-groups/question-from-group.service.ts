import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  BaseFormGroupService,
  FormArrayService,
  IFormArrayService,
} from '@tmkn/core';
import {
  AnswersModel,
  QuestionModel,
  QuestionType,
} from '../model/question.model';

@Injectable()
export class QuestionFormGroupService extends BaseFormGroupService<QuestionModel> {
  constructor(
    private fb: FormBuilder,
    private formArrayService: IFormArrayService,
    private answerFormGroupService: AnswerFormGroupService
  ) {
    super();
  }

  protected build(initialValue?: QuestionModel): FormGroup {
    const fg = this.fb.group({
      question: new FormControl<string | undefined>(initialValue?.question, {
        validators: [Validators.required],
      }),
      answers: this.fb.array([]),
      explanation: new FormControl<string | undefined>(
        initialValue?.explanation,
        {
          validators: [Validators.required],
        }
      ),
      explanationAr: new FormControl<string | undefined>(
        initialValue?.explanationAr
      ),
      externalURL: new FormControl<string | undefined>(
        initialValue?.externalURL
      ),
      type: new FormControl<QuestionType | undefined>(initialValue?.type, {
        validators: [Validators.required],
      }),
    });

    initialValue?.answers.forEach((answer) => {
      this.formArrayService.addItemToFormArray(
        'answers',
        fg,
        this.answerFormGroupService.initialize(answer, initialValue.type)
      );
    });

    return fg;
  }
}

@Injectable()
export class AnswerFormGroupService extends BaseFormGroupService<AnswersModel> {
  constructor(private fb: FormBuilder) {
    super();
  }

  public override initialize(
    initialValue?: AnswersModel,
    questionType?: QuestionType
  ): FormGroup {
    this.initialValue = initialValue;
    this._formGroup = this.build(this.initialValue, questionType);
    return this._formGroup;
  }

  protected build(
    initialValue?: AnswersModel,
    questionType?: QuestionType
  ): FormGroup {
    return this.fb.group({
      answer: new FormControl<string | undefined>(
        {
          value: initialValue?.answer,
          disabled: questionType === QuestionType.YesOrNoQuestion,
        },
        {
          validators: [Validators.required],
        }
      ),
      answerAr: new FormControl<string | undefined>({
        value: initialValue?.answerAr,
        disabled: questionType === QuestionType.YesOrNoQuestion,
      }),
      isCorrect: new FormControl<boolean | undefined>(initialValue?.isCorrect),
    });
  }
}
