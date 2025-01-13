import { TmColors } from '../../../models/types';

export interface ButtonNavigatorItem {
  routerLink: string;
  color: TmColors;
  icon: string;
  title: string;
  exactMatch?: boolean;
}
