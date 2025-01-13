import { TmColors } from '../../../models/types';

export interface TmTableAction<T> {
  icon: string;
  color: TmColors;
  title: string;
  action: (row: T) => void;
  visibleCondition: (row: T) => boolean;
}
