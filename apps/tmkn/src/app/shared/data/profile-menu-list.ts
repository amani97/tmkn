import { MenuDataModel } from '@tmkn/ui';
import { TmknAppRoutes } from '../config/routes.config';

export const PROFILE_MENU_LIST: MenuDataModel[] = [
  {
    title: 'Profile',
    routeLink: `/${TmknAppRoutes.Dashboard}/${TmknAppRoutes.Dashboard}`,
    icon: 'user_scan',
  },
  {
    title: 'Logout',
    routeLink: `/${TmknAppRoutes.Auth}/${TmknAppRoutes.Logout}`,
    icon: 'export',
  },
];
