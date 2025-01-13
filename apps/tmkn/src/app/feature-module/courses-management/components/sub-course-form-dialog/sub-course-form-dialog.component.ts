import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CourseManagementType } from 'apps/tmkn/src/app/shared/enums/course-management-type.enum';
import { SubCourseFormGroupService } from '../../form-groups/sub-course-form-group.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { SubCoursesService } from 'apps/tmkn/src/app/feature-module/courses-management/data/sub-courses.service';
import { SubCourse } from 'apps/tmkn/src/app/feature-module/courses-management/model/sub-course.model';

@Component({
  selector: 'app-sub-course-form-dialog',
  standalone: false,

  templateUrl: './sub-course-form-dialog.component.html',
  styleUrl: './sub-course-form-dialog.component.scss',
})
export class SubCourseFormDialogComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private subCourseFormGroupService = inject(SubCourseFormGroupService);
  private subCoursesService = inject(SubCoursesService);
  public dialogRef = inject(MatDialogRef<SubCourseFormDialogComponent>);
  public data: any = inject(MAT_DIALOG_DATA);

  isEditMode = false;
  subCourseFg!: FormGroup;

  async ngOnInit(): Promise<void> {
    if (this.data && this.data.id) {
      this.isEditMode = true;
      await this.loadEditForm(this.data.id);
    } else {
      this.subCourseFg = this.subCourseFormGroupService.initialize();
    }
  }

  async loadEditForm(id: number) {
    const data = await lastValueFrom(this.subCoursesService.getById(id)) as SubCourse;
    this.subCourseFg = this.subCourseFormGroupService.initialize(data);
  }

  onSubmit() {
    let data = this.subCourseFormGroupService.getValue();
    data = {
      ...data,
      type: CourseManagementType.SubCourses,
    };
    if (this.isEditMode) {
      this.subCoursesService.update(data.id, data).subscribe();
    } else {
      this.subCoursesService.create(data).subscribe((data) => {
        console.log('Res: ', data);
      });
    }
    this.dialogRef.close();
  }
}
