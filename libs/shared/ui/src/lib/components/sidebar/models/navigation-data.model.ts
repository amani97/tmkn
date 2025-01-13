export interface NavigationDataModel {
  label: string;
  routeLink: string;
  icon: string;
  isActive: boolean;
  expanded: boolean;
  children: NavigationDataModel[];
  canAccess: boolean;
  disabled: boolean;
}
