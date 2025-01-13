import { MainSidebarDataModel, NavigationDataModel } from "@tmkn/ui";
import { TmknAppRoutes } from "../config/routes.config";

export const SIDE_BAR_NAVIGATION_LIST: MainSidebarDataModel[] = [
  {
    title: 'navigation.main-section.title',
    canAccess: true,
    menu: [
      {
        label: 'navigation.main-section.courses',
        routeLink: `/${TmknAppRoutes.Dashboard}/${TmknAppRoutes.Courses}`,
        icon: 'ti ti-book',
        isActive: false,
        expanded: false,
        children: [],
        canAccess: true,
        disabled: false,
      },
    ]
  },
  {
    title: 'navigation.users.title',
    canAccess: true,
    menu: [
      {
        label: 'navigation.users.students',
        routeLink: `/${TmknAppRoutes.Dashboard}/${TmknAppRoutes.Students}`,
        icon: 'ti ti-school',
        isActive: false,
        expanded: false,
        children: [],
        canAccess: true,
        disabled: false,
      },
      {
        label: 'navigation.users.teachers',
        routeLink: `/${TmknAppRoutes.Dashboard}/${TmknAppRoutes.Teachers}`,
        icon: 'ti ti-users',
        isActive: false,
        expanded: false,
        children: [
          {
            label: 'Sub 1',
            routeLink: `/${TmknAppRoutes.Dashboard}/${TmknAppRoutes.Teachers}`,
            icon: 'ti ti-users',
            isActive: false,
            expanded: false,
            children: [],
            canAccess: true,
            disabled: false,
          },
          {
            label: 'Sub 2',
            routeLink: `/${TmknAppRoutes.Dashboard}/${TmknAppRoutes.Teachers}`,
            icon: 'ti ti-users',
            isActive: false,
            expanded: false,
            children: [
              {
                label: 'Sub 2.1',
                routeLink: `/${TmknAppRoutes.Dashboard}/${TmknAppRoutes.Teachers}`,
                icon: 'ti ti-users',
                isActive: false,
                expanded: false,
                children: [],
                canAccess: true,
                disabled: false,
              },
            ],
            canAccess: true,
            disabled: false,
          },
        ],
        canAccess: true,
        disabled: false,
      },
    ]
  },
];
