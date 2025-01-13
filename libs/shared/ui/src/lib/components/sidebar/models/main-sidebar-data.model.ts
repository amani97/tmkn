import { NavigationDataModel } from './navigation-data.model';

export interface MainSidebarDataModel {
  title: string;
  menu: NavigationDataModel[];
  canAccess: boolean;
}
