import { TmDialogTypes } from '../../../../models/types';

export interface ConfirmDialogData {
  title: string;
  message: string;
  submitTitle: string;
  discardTitle: string;
  dialogType: TmDialogTypes;
}
