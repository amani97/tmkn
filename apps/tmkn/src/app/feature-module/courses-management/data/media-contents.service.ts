import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../../shared/data/generic.service';
import { LectureVideo } from '../model/lecture-video.model';
import { QuizModel } from '../model/question.model';
import { LectureNote } from '../model/note.model';

@Injectable({
  providedIn: 'root',
})
export class MediaContentsService extends GenericService<LectureVideo | QuizModel | LectureNote> {
  constructor(http: HttpClient) {
    super(http, 'json/media-contents.json');
  }
}
