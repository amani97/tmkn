import { Component, inject, OnInit } from '@angular/core';
import { QuizFormGroupService } from '../../form-groups/quiz-form-group.service';
import { MediaContentsService } from 'apps/tmkn/src/app/feature-module/courses-management/data/media-contents.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { QuizModel } from 'apps/tmkn/src/app/feature-module/courses-management/model/question.model';
import { MediaContentType } from 'apps/tmkn/src/app/shared/enums/media-content-type.enum';

@Component({
  selector: 'app-quiz-form-dialog',
  standalone: false,
  templateUrl: './quiz-form-dialog.component.html',
  styleUrl: './quiz-form-dialog.component.scss',
})
export class QuizFormDialogComponent implements OnInit {
  private quizFormGroupService = inject(QuizFormGroupService);
  private mediaContentsService = inject(MediaContentsService);
  public dialogRef = inject(MatDialogRef<QuizFormDialogComponent>);
  public data: any = inject(MAT_DIALOG_DATA);

  isEditMode = false;
  quizFg!: FormGroup;

  async ngOnInit(): Promise<void> {
    if (this.data && this.data.id) {
      this.isEditMode = true;
      await this.loadEditForm(this.data.id);
    } else {
      this.quizFg = this.quizFormGroupService.initialize();
    }
  }

  async loadEditForm(id: number) {
    const data = (await lastValueFrom(
      this.mediaContentsService.getById(id)
    )) as QuizModel;
    this.quizFg = this.quizFormGroupService.initialize(data);
  }

  onSubmit() {
    let data = this.quizFormGroupService.getValue();
    data = {
      ...data,
      type: MediaContentType.Quiz,
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
