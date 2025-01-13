import { ButtonNavigatorItem } from '@tmkn/ui';
import { TmknAppRoutes } from '../../../shared/config';

export const NAVIGATION_COURSES_MANAGEMENT: ButtonNavigatorItem[] = [
  {
    routerLink: `.`,
    color: 'primary',
    icon: 'ti ti-book',
    title: 'courses.selected-course',
    exactMatch: true,
  },
  {
    routerLink: `./${TmknAppRoutes.SubCourses}`,
    color: 'purple',
    icon: 'ti ti-brand-my-oppo',
    title: 'courses.sub-courses-and-services',
    exactMatch: false,
  },
  // {
  //   routerLink: `./${TmknAppRoutes.Services}`,
  //   color: 'yellow',
  //   icon: 'ti ti-brand-my-oppo',
  //   title: 'courses.services',
  //   exactMatch: false,
  // },
  // {
  //   routerLink: `./${TmknAppRoutes.PaperNotes}`,
  //   color: 'purple',
  //   icon: 'ti ti-file-description',
  //   title: 'courses.paper-notes',
  //   exactMatch: false,
  // },
];


export const EDUCATIONAL_CONTENT_MANAGEMENT: ButtonNavigatorItem[] = [
  {
    routerLink: `.`,
    color: 'accent',
    icon: 'ti ti-book',
    title: 'Videos',
    exactMatch: true,
  },
  {
    routerLink: `./${TmknAppRoutes.SubCourses}`,
    color: 'yellow',
    icon: 'ti ti-book',
    title: 'Video Streams',
    exactMatch: false,
  },
  {
    routerLink: `./${TmknAppRoutes.Services}`,
    color: 'primary',
    icon: 'ti ti-brand-my-oppo',
    title: 'Notes',
    exactMatch: false,
  },
  {
    routerLink: `./${TmknAppRoutes.PaperNotes}`,
    color: 'purple',
    icon: 'ti ti-file-description',
    title: 'Other Files',
    exactMatch: false,
  },
  {
    routerLink: `./${TmknAppRoutes.PaperNotes}`,
    color: 'warn',
    icon: 'ti ti-file-description',
    title: 'Exams',
    exactMatch: false,
  },
];
