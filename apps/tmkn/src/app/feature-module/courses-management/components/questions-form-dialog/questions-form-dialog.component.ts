import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormArrayService, IFormArrayService } from '@tmkn/core';
import {
  AnswerFormGroupService,
  QuestionFormGroupService,
} from '../../form-groups/question-from-group.service';
import { MatRadioChange } from '@angular/material/radio';
import {
  AnswersModel,
  QuestionModel,
  QuestionType,
  QuizModel,
} from 'apps/tmkn/src/app/feature-module/courses-management/model/question.model';
import { map, Observable } from 'rxjs';
import { QuestionsService } from 'apps/tmkn/src/app/feature-module/courses-management/data/questions.service';
import { MatSelectionListChange } from '@angular/material/list';
import { QuizFormGroupService } from '../../form-groups/quiz-form-group.service';
import { TmConfirmationDialogService } from 'libs/shared/ui/src/lib/components/dialog/services/confirmation-dialog.service';
import { TmDialogType } from '@tmkn/ui';

@Component({
  selector: 'app-add-questions-form-dialog',
  standalone: false,
  templateUrl: './questions-form-dialog.component.html',
  styleUrl: './questions-form-dialog.component.scss',
})
export class QuestionsFormDialogComponent implements OnInit {
  private readonly questionsService = inject(QuestionsService);
  private readonly quizFormGroupService = inject(QuizFormGroupService);
  private readonly confirmationDialogService = inject(
    TmConfirmationDialogService
  );

  form: FormGroup;
  itemsControl = new FormControl();
  QuestionType = QuestionType;
  selectedType!: QuestionType | null;
  questionsList$: Observable<QuestionModel[]> = this.questionsService
    .getQuestionsList()
    .pipe(map((x) => x.questions));
  quiz$: Observable<QuizModel> = this.questionsService.getQuestionsList();
  questionsList: QuestionModel[] = [];
  selectedQuestion!: QuestionModel;
  selectedQuestionIndex!: number;
  isNewQuestion = false;

  questionsFg!: FormGroup;
  quizFg!: FormGroup;

  get showDeleteQuestion() {
    if (!!this.selectedQuestionIndex) {
      return true;
    }
    return false;
  }
  get answers() {
    if (this.questionsFg) {
      return this.questionsFg.get('answers') as FormArray;
    }
    return null as unknown as FormArray;
  }

  get disableAddAnswer() {
    return this.answers.controls.length >= 4;
  }
  get disableYesOrNoAddAnswer() {
    return this.answers.controls.length >= 2;
  }
  constructor(
    private questionFormGroupService: QuestionFormGroupService,
    private answerFormGroupService: AnswerFormGroupService,
    private formArrayService: IFormArrayService
  ) {
    this.form = new FormGroup({
      clothes: this.itemsControl,
    });
  }

  onSelectionChange(event: MatSelectionListChange) {
    const question: QuestionModel = event.options[0].value;
    this.selectedType = question.type;
    this.selectedQuestion = question;
    this.selectedQuestionIndex = question.id;
    this.questionsFg = this.questionFormGroupService.initialize(question);
  }
  ngOnInit(): void {
    this.quiz$.subscribe((data) => {
      this.quizFg = this.quizFormGroupService.initialize(data);
    });
  }

  onChangeIsCorrect(event: MatRadioChange) {
    if(event instanceof MatRadioChange){
      const changedIndex = event.value;
      this.answers.controls[event.value].get('isCorrect')?.setValue(true);
      this.answers.controls.forEach((item, index) => {
        if (changedIndex !== index) {
          item.get('isCorrect')?.setValue(false);
        }
      });
    }
  }

  onAddAnswerClicked() {
    this.formArrayService.addItemToFormArray(
      'answers',
      this.questionsFg,
      this.answerFormGroupService.initialize()
    );
  }

  onDeleteAnswerClicked(index: number) {
    this.formArrayService.removeItemFromFormArray(
      'answers',
      this.questionsFg,
      index
    );
  }

  addQuestion(questionType: QuestionType) {
    this.selectedType = questionType;
    this.selectedQuestion = null as unknown as QuestionModel;
    this.selectedQuestionIndex = null as unknown as number;
    if (this.selectedType === QuestionType.MultipleChoice) {
      this.multipleChoice();
    }
    if (this.selectedType === QuestionType.MultipleSelection) {
      this.multipleSelection();
    }
    if (this.selectedType === QuestionType.YesOrNoQuestion) {
      this.yesOrNoQuestion();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.questionsList,
      event.previousIndex,
      event.currentIndex
    );
  }

  multipleChoice() {
    const question = {
      id: null as unknown as number,
      type: this.selectedType,
      question: null as unknown as string,
      questionAr: null as unknown as string,
      answers: [],
      explanation: null as unknown as string,
      explanationAr: null as unknown as string,
      externalURL: null as unknown as string,
    } as QuestionModel;

    const answers: AnswersModel[] = [
      {
        answer: null as unknown as string,
        answerAr: null as unknown as string,
        isCorrect: false,
      },
      {
        answer: null as unknown as string,
        answerAr: null as unknown as string,
        isCorrect: false,
      },
    ];
    this.questionsFg = this.questionFormGroupService.initialize(question);

    answers.forEach((item) => {
      this.formArrayService.addItemToFormArray(
        'answers',
        this.questionsFg,
        this.answerFormGroupService.initialize(item)
      );
    });
  }

  multipleSelection() {
    const question = {
      id: null as unknown as number,
      type: this.selectedType,
      question: null as unknown as string,
      questionAr: null as unknown as string,
      answers: [],
      explanation: null as unknown as string,
      explanationAr: null as unknown as string,
      externalURL: null as unknown as string,
    } as QuestionModel;
    const answers: AnswersModel[] = [
      {
        answer: null as unknown as string,
        answerAr: null as unknown as string,
        isCorrect: false,
      },
      {
        answer: null as unknown as string,
        answerAr: null as unknown as string,
        isCorrect: false,
      },
    ];
    this.questionsFg = this.questionFormGroupService.initialize(question);

    answers.forEach((item) => {
      this.formArrayService.addItemToFormArray(
        'answers',
        this.questionsFg,
        this.answerFormGroupService.initialize(item)
      );
    });
  }

  yesOrNoQuestion() {
    const question = {
      id: null as unknown as number,
      type: this.selectedType,
      question: null as unknown as string,
      questionAr: null as unknown as string,
      answers: [],
      explanation: null as unknown as string,
      explanationAr: null as unknown as string,
      externalURL: null as unknown as string,
    } as QuestionModel;
    const answers: AnswersModel[] = [
      {
        answer: 'Yes',
        answerAr: 'Yes',
        isCorrect: false,
      },
      { answer: 'No', answerAr: 'No', isCorrect: false },
    ];
    this.questionsFg = this.questionFormGroupService.initialize(question);

    answers.forEach((item) => {
      this.formArrayService.addItemToFormArray(
        'answers',
        this.questionsFg,
        this.answerFormGroupService.initialize(
          item,
          QuestionType.YesOrNoQuestion
        )
      );
    });
  }

  submitNewQuestion() {
    const quiz = this.quizFg.getRawValue() as QuizModel;
    console.log('Quiz:', quiz);
  }

  saveQuestion() {
    const newQuestion = this.questionsFg.getRawValue() as QuestionModel;
    this.questionsService.addQuestion(newQuestion).subscribe();
    this.selectedType = null;
  }

  deleteQuestion(index: number) {
    if (this.selectedQuestionIndex) {
      this.confirmationDialogService
        .openConfirmDialog({
          title: 'Delete question',
          message: 'Are you sure you want to delete question?',
          submitTitle: 'Yes',
          discardTitle: 'No',
          dialogType: TmDialogType.Delete,
        })
        .subscribe(async (value) => {
          if (value) {
            this.selectedType = null;
            this.questionsService.deleteQuestion(index).subscribe((res) => {
              console.log('res: ', res);
            });
          }
        });
    } else {
      this.selectedType = null;
    }
  }
}
