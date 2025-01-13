import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MediaContentsService } from 'apps/tmkn/src/app/feature-module/courses-management/data/media-contents.service';
import { CourseManagementType } from 'apps/tmkn/src/app/shared/enums/course-management-type.enum';
import { MediaContentType } from 'apps/tmkn/src/app/shared/enums/media-content-type.enum';
import { LectureVideo } from 'apps/tmkn/src/app/feature-module/courses-management/model/lecture-video.model';
import { DynamicFormField } from 'libs/shared/ui/src/lib/components/form-field/models/dtos/form-field.dto';
import { lastValueFrom } from 'rxjs';
import { LectureVideoFormGroupService } from '../../form-groups/video-form-group.service';
import { VideoFormDialogComponent } from '../video-form-dialog/video-form-dialog.component';

@Component({
  selector: 'app-video-streams-form-dialog',
  standalone: false,

  templateUrl: './video-streams-form-dialog.component.html',
  styleUrl: './video-streams-form-dialog.component.scss',
})
export class VideoStreamsFormDialogComponent implements OnInit {
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
        type: MediaContentType.VideoStreams,
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
