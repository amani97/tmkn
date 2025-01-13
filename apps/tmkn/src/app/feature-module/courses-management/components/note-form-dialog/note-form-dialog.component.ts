import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MediaContentsService } from 'apps/tmkn/src/app/feature-module/courses-management/data/media-contents.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { MediaContentType } from 'apps/tmkn/src/app/shared/enums/media-content-type.enum';
import { NoteFormGroupService } from '../../form-groups/note-form-group.service';
import { LectureNote } from 'apps/tmkn/src/app/feature-module/courses-management/model/note.model';

@Component({
  selector: 'app-note-form-dialog',
  standalone: false,
  templateUrl: './note-form-dialog.component.html',
  styleUrl: './note-form-dialog.component.scss',
})
export class NoteFormDialogComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private noteFormGroupService = inject(NoteFormGroupService);
  private mediaContentsService = inject(MediaContentsService);
  public dialogRef = inject(MatDialogRef<NoteFormDialogComponent>);
  public data: any = inject(MAT_DIALOG_DATA);

  isEditMode = false;
  noteFg!: FormGroup;

  async ngOnInit(): Promise<void> {
    if (this.data && this.data.id) {
      this.isEditMode = true;
      await this.loadEditForm(this.data.id);
    } else {
      this.noteFg = this.noteFormGroupService.initialize();
    }
  }

  async loadEditForm(id: number) {
    const data = (await lastValueFrom(
      this.mediaContentsService.getById(id)
    )) as LectureNote;
    this.noteFg = this.noteFormGroupService.initialize(data);
  }

  onSubmit() {
    let data = this.noteFormGroupService.getValue();
    data = {
      ...data,
      type: MediaContentType.Notes,
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
