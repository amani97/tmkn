import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../../shared/data/generic.service';
import { QuizModel } from '../model/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService extends GenericService<QuizModel> {
  constructor(http: HttpClient) {
    super(http, 'json/quiz.json');
  }
}
