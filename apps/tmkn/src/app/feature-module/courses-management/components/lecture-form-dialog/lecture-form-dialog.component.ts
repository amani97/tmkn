import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CourseManagementType } from 'apps/tmkn/src/app/shared/enums/course-management-type.enum';
import { LectureManagementType } from 'apps/tmkn/src/app/shared/enums/lecture-media-type.enum';
import { DynamicFormField } from 'libs/shared/ui/src/lib/components/form-field/models/dtos/form-field.dto';
import { LectureFormGroupService } from '../../form-groups/lecture-form-group.service';
import { LecturesService } from 'apps/tmkn/src/app/feature-module/courses-management/data/lectures.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Lecture } from 'apps/tmkn/src/app/feature-module/courses-management/model/lecture.model';

@Component({
  selector: 'app-lecture-form-dialog',
  standalone: false,
  templateUrl: './lecture-form-dialog.component.html',
  styleUrl: './lecture-form-dialog.component.scss',
})
export class LectureFormDialogComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private lectureFormGroupService = inject(LectureFormGroupService);
  private lecturesService = inject(LecturesService);
  public dialogRef = inject(MatDialogRef<LectureFormDialogComponent>);
  public data: any = inject(MAT_DIALOG_DATA);

  isEditMode = false;
  lectureFg!: FormGroup;

  async ngOnInit(): Promise<void> {
    if (this.data && this.data.id) {
      this.isEditMode = true;
      await this.loadEditForm(this.data.id);
    } else {
      this.lectureFg = this.lectureFormGroupService.initialize();
    }
  }

  async loadEditForm(id: number) {
    const data = (await lastValueFrom(
      this.lecturesService.getById(id)
    )) as Lecture;
    this.lectureFg = this.lectureFormGroupService.initialize(data);
  }

  onSubmit() {
    let data = this.lectureFormGroupService.getValue();

    if (this.isEditMode) {
      this.lecturesService.update(data.id, data).subscribe();
    } else {
      this.lecturesService.create(data).subscribe((data) => {
        console.log('Res: ', data);
      });
    }
    this.dialogRef.close();
  }
}
