import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SubCoursesService } from 'apps/tmkn/src/app/feature-module/courses-management/data/sub-courses.service';
import { CourseManagementType } from 'apps/tmkn/src/app/shared/enums/course-management-type.enum';
import { lastValueFrom } from 'rxjs';
import { PaperNote } from 'apps/tmkn/src/app/feature-module/courses-management/model/paper-note.model';
import { PaperNoteFormGroupService } from '../../form-groups/paper-note-form-group.service';

@Component({
  selector: 'app-paper-note-form-dialog',
  standalone: false,

  templateUrl: './paper-note-form-dialog.component.html',
  styleUrl: './paper-note-form-dialog.component.scss',
})
export class PaperNoteFormDialogComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private paperNoteFormGroupService = inject(PaperNoteFormGroupService);
  private subCoursesService = inject(SubCoursesService);
  public dialogRef = inject(MatDialogRef<PaperNoteFormDialogComponent>);
  public data: any = inject(MAT_DIALOG_DATA);

  isEditMode = false;
  paperNoteFg!: FormGroup;

  async ngOnInit(): Promise<void> {
    if (this.data && this.data.id) {
      this.isEditMode = true;
      await this.loadEditForm(this.data.id);
    } else {
      this.paperNoteFg = this.paperNoteFormGroupService.initialize();
    }
  }

  async loadEditForm(id: number) {
    const data = (await lastValueFrom(
      this.subCoursesService.getById(id)
    )) as PaperNote;
    this.paperNoteFg = this.paperNoteFormGroupService.initialize(data);
  }

  onSubmit() {
    let data = this.paperNoteFormGroupService.getValue();
    data = {
      ...data,
      type: CourseManagementType.PaperNote,
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
