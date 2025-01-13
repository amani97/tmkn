import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubCourse } from '../model/sub-course.model';
import { GenericService } from '../../../shared/data/generic.service';
import { ServiceCourse } from '../model/service-course.model';
import { PaperNote } from '../model/paper-note.model';

@Injectable({
  providedIn: 'root',
})
export class SubCoursesService extends GenericService<SubCourse | ServiceCourse | PaperNote> {
  constructor(http: HttpClient) {
    super(http, 'json/sub-courses.json');
  }
}
