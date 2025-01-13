import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewEncapsulation,
  OnInit,
  AfterViewInit,
  input,
  signal,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TmDialogTypes } from '../../../../models/types';
import { TmColor, TmDialogType } from '../../../../models/enums';

@Component({
  selector: 'tm-ui-base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class BaseDialogComponent implements OnInit, AfterViewInit {
  headerIcon = input<string>();
  headerTitle = input.required<string>();
  submitTitle = input<string>();
  submitAndResetTitle = input<string>();
  discardTitle = input<string>();
  showActions = input<boolean>(false);
  showSubmitAndReset = input<boolean>(false);
  isValidForm = input<boolean>(true);
  showHeader = input<boolean>(true);
  dialogType = input<TmDialogTypes>('submit');

  _dialogType = signal(this.dialogType());

  @Output() submitAction = new EventEmitter<null>();
  @Output() submitAndReset = new EventEmitter<null>();
  @Output() discardAction = new EventEmitter<null>();
  cancelButtonColor: TmColor = TmColor.Warn;
  submitButtonColor: TmColor = TmColor.Accent;

  constructor(
    public dialogRef: MatDialogRef<BaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unknown
  ) {}
  ngAfterViewInit(): void {
    switch (this._dialogType()) {
      case TmDialogType.Delete:
        this.cancelButtonColor = TmColor.Warn;
        this.submitButtonColor = TmColor.Warn;
        break;
      case TmDialogType.Submit:
        this.cancelButtonColor = TmColor.Warn;
        this.submitButtonColor = TmColor.Accent;
        break;

      default:
        this.cancelButtonColor = TmColor.Warn;
        this.submitButtonColor = TmColor.Accent;
        break;
    }
  }
  ngOnInit() {
    if ((this.data as { dialogType: TmDialogTypes })?.dialogType) {
      this._dialogType.set((this.data as { dialogType: TmDialogTypes }).dialogType);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmitDialog() {
    this.submitAction.emit();
  }

  onDiscardedDialog() {
    this.discardAction.emit();
  }

  onSubmitAndResetDialog() {
    this.submitAndReset.emit();
  }
}
