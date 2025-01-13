import { TmTableAction } from './table-action.model';
import { TmTableColumn } from './table-column.model';

export interface TmTableMetaData<T> {
  columns: TmTableColumn<T>[];
  actions: TmTableAction<T>[];
  otherActions: TmTableAction<T>[];
}
