import { Component, inject, OnInit } from '@angular/core';
import { QuizFormGroupService } from '../../form-groups/quiz-form-group.service';
import { MediaContentsService } from 'apps/tmkn/src/app/feature-module/courses-management/data/media-contents.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { QuizModel } from 'apps/tmkn/src/app/feature-module/courses-management/model/question.model';
import { MediaContentType } from 'apps/tmkn/src/app/shared/enums/media-content-type.enum';
import { QuizService } from '../../data/quiz.service';
interface data {
  name: string;
  code: string;
}

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
  private quizService = inject(QuizService);

  isEditMode = false;
  quizFg!: FormGroup;
  sectionOptions = [
    { label: 'A ', value: '1' },
    { label: 'B', value: '2' },
    { label: 'C', value: '3' },
  ];
  examNameOptions = [
    { label: 'Week text ', value: '1' },
    { label: 'Mothly Test', value: '2' },
    { label: 'Chapter Wise text ', value: '3' },
    { label: 'Unit Test', value: '4' },
  ];
  durationOptions = [
    { label: 'Select ', value: '1' },
    { label: '3hrs', value: '2' },
  ];
  examDateOptions = [
    { label: '13 May 2024 ', value: '1' },
    { label: '14 May 2024', value: '2' },
    { label: '15 May 2024', value: '3' },
  ];
  subjectOptions = [
    { label: 'English ', value: '1' },
    { label: 'Spanish', value: '2' },
    { label: 'Physics', value: '3' },
  ];
  roomNoOptions = [
    { label: '101 ', value: '1' },
    { label: '102', value: '2' },
    { label: '103', value: '3' },
  ];
  maxMarksOptions = [
    { label: 'Select ', value: '1' },
    { label: '100', value: '2' },
  ];
  minMarksOptions = [
    { label: 'Select ', value: '1' },
    { label: '35', value: '2' },
  ];
  starttime = [
    { name: '09:30 AM', code: '1' },
    { name: '10:30 AM', code: '2' },
    { name: '11:30 AM', code: '3' },
    { name: '12:30 PM', code: '3' },
  ];
  endtime = [
    { name: '10:30 AM', code: '1' },
    { name: '11:30 AM', code: '2' },
    { name: '12:30 PM', code: '3' },
    { name: '1:30 PM', code: '4' },
  ];
  formData: { selectedClass: data | undefined }[] = [];

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
      this.quizService.create(data).subscribe((data) => {
        console.log('Res: ', data);
      });
    }
    this.dialogRef.close();
  }
}
