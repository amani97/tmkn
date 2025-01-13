import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CourseManagementType } from 'apps/tmkn/src/app/shared/enums/course-management-type.enum';
import { DynamicFormField } from 'libs/shared/ui/src/lib/components/form-field/models/dtos/form-field.dto';
import { MediaContentsService } from 'apps/tmkn/src/app/feature-module/courses-management/data/media-contents.service';
import { FormGroup } from '@angular/forms';
import { LectureVideoFormGroupService } from '../../form-groups/video-form-group.service';
import { LectureVideo } from 'apps/tmkn/src/app/feature-module/courses-management/model/lecture-video.model';
import { lastValueFrom } from 'rxjs';
import { MediaContentType } from 'apps/tmkn/src/app/shared/enums/media-content-type.enum';

@Component({
  selector: 'app-video-form-dialog',
  standalone: false,
  templateUrl: './video-form-dialog.component.html',
  styleUrl: './video-form-dialog.component.scss',
})
export class VideoFormDialogComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private lectureVideoFormGroupService = inject(LectureVideoFormGroupService);
  private mediaContentsService = inject(MediaContentsService);
  public dialogRef = inject(MatDialogRef<VideoFormDialogComponent>);
  public data: any = inject(MAT_DIALOG_DATA);

  isEditMode = false;
  videoFg!: FormGroup;

  async ngOnInit(): Promise<void> {
    if (this.data && this.data.id) {
      this.isEditMode = true;
      await this.loadEditForm(this.data.id);
    } else {
      this.videoFg = this.lectureVideoFormGroupService.initialize();
    }
  }

  async loadEditForm(id: number) {
    const data = (await lastValueFrom(
      this.mediaContentsService.getById(id)
    )) as LectureVideo;
    this.videoFg = this.lectureVideoFormGroupService.initialize(data);
  }

  onSubmit() {
    let data = this.lectureVideoFormGroupService.getValue();
    data = {
      ...data,
      type: MediaContentType.Videos,
    };
    if (this.isEditMode) {
      this.mediaContentsService.update(data.id!, data).subscribe();
    } else {
      this.mediaContentsService.create(data).subscribe((data) => {
        console.log('Res: ', data);
      });
    }
    this.dialogRef.close();
  }
}
