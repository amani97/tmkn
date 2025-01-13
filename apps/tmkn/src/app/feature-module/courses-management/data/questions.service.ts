import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { QuestionModel, QuizModel } from '../model/question.model'; // Update the path as needed
import { apiResultFormat } from '../model/pages.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private questions: QuestionModel[] = [];
  private quiz!: QuizModel;
  private isDataLoaded = false;

  constructor(private http: HttpClient) {}

  public getQuestionsList(): Observable<QuizModel> {
    if (this.isDataLoaded) {
      return of(this.quiz);
    }

    return this.http.get<apiResultFormat>('json/question.json').pipe(
      map((data) => data.data),
      tap((data: QuizModel) => {
        this.quiz = data;
        this.questions = data.questions;
        this.isDataLoaded = true;
      })
    );
  }

  public addQuestion(question: QuestionModel): Observable<QuestionModel[]> {
    this.questions.push(question);
    return of(this.questions);
  }

  public deleteQuestion(id: number): Observable<QuestionModel[]> {
    if (this.questions.length > 0) {
      const index = this.questions.findIndex((x) => x.id === id);
      if (index > -1) {
        this.questions.splice(index, 1);
      }
    }
    return of(this.questions);
  }
}
