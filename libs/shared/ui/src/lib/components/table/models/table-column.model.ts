import { TmColors } from '../../../models/types';
import { HighlightedColors } from './highlighted-colors.type';

export interface TmTableColumn<T> {
  columnDef: string;
  header: string;
  cell: (row: T) => string;
  link?: string;
  styles?: ColumnStylesOptions;
  type?: ColumnDataType;
  dateFormat?: string;
  highlightedLogic?: (row: T) => HighlightedColors;
}

export interface ColumnStylesOptions {
  isBold?: boolean;
  isStatus?: boolean;
  status?: StatusStyle;
}

export enum StyleClassName {
  Bold = 'tm-bold',
  Status = 'tm-status',
}

export interface StatusStyle {
  color: TmColors;
}

export declare type ColumnDataType =
  | 'date'
  | 'text'
  | 'number'
  | 'image'
  | 'currency'
  | 'timeAgo'
  | 'link'
  | 'highlighted';
