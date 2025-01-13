import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../models/dtos/confirm-dialog-data.dto';
import { TmDialogType } from '../../../../models/enums';

@Component({
  selector: 'tm-ui-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmDialogComponent {
  DialogType = TmDialogType;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  onClose() {
    this.dialogRef.close();
  }
}
