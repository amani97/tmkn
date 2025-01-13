import { Injectable } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { apiResultFormat } from '../model/pages.model';
import { TmknAppRoutes } from '../../../shared/config';
import { GenericService } from '../../../shared/data/generic.service';
import { Lecture } from '../model/lecture.model';

@Injectable({
  providedIn: 'root',
})
export class LecturesService extends GenericService<Lecture> {
  constructor(http: HttpClient) {
    super(http, 'json/lectures.json');
  }
}
