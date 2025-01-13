import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../../shared/data/generic.service';
import { Course } from '../model/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService extends GenericService<Course> {
  constructor(http: HttpClient) {
    super(http, 'json/courses.json');
  }
}
