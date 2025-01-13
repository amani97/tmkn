import { Component, inject, OnInit } from '@angular/core';
import { INavigationManagerService } from '@tmkn/core';
import { Pagination } from '@tmkn/ui';
import { TmknAppRoutes } from 'apps/tmkn/src/app/shared/config';
import { TmTableMetaData } from 'libs/shared/ui/src/lib/components/table/models';
import { filter, map, Observable, of, startWith } from 'rxjs';
import { NAVIGATION_COURSES_MANAGEMENT } from '../../config/navigator.nav';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';
import { Course } from 'apps/tmkn/src/app/feature-module/courses-management/model/course.model';

@Component({
  selector: 'app-courses-management-container',
  standalone: false,

  templateUrl: './courses-management-container.component.html',
  styleUrl: './courses-management-container.component.scss',
})
export class CoursesManagementContainerComponent implements OnInit {
  private readonly navigationManagerService = inject(INavigationManagerService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  course: Course = {
    id: 5,
    title: 'Course 1',
    titleAr: 'Course 1',
    description: 'Course 1 description',
    descriptionAr: 'Course 1 description',
    firstLevel: 'Level 1',
    secondLevel: 'Level 1 / Level 2',
    thirdLevel: 'Level 1 / Level 2 / Level 3',
    teacher: 'Samir Alholo',
    price: 500,
    priceAfterDiscount: 250,
    class: 'University',
    whatsappGroupLink: 'https://wa.me/966500000000',
    active: true,
    accepted: false,
    showHomePage: false,
    showAtStoreNotes: false,
    availableForSale: false,
  };

  showNavigationButtons$: Observable<boolean> = of(false);
  notInCourseForm$: Observable<boolean> = this.router.events.pipe(
    startWith(null), // Add an initial value to handle page load
    filter(
      (event) =>
        !event || event instanceof Scroll || event instanceof NavigationEnd
    ),
    map(
      (event) =>
        event instanceof Scroll
          ? (event as Scroll).routerEvent.url
          : event instanceof NavigationEnd
          ? (event as NavigationEnd).urlAfterRedirects
          : this.router.url // Handle the initial load case
    ),
    map((url) => {
      // Use a regular expression to check if the URL matches the pattern
      const regex = /\/dashboard\/courses\/edit\/\d+$/;
      const matches = regex.test(url);
      return !matches;
    })
  );
  list = NAVIGATION_COURSES_MANAGEMENT;
  activeLink = this.list[0].routerLink;
  addBtnLink: string[] = [
    TmknAppRoutes.Empty,
    TmknAppRoutes.Dashboard,
    TmknAppRoutes.CourseManagement,
    TmknAppRoutes.Courses,
    TmknAppRoutes.Add,
  ];
  loading$!: Observable<boolean>;
  pagination$!: Observable<Pagination>;
  coursesMetaData: TmTableMetaData<Course> = {
    columns: [
      {
        columnDef: 'id',
        header: 'Id',
        cell: (element: Course) => `${element.id}`,
      },
      {
        columnDef: 'title',
        header: 'Title',
        cell: (element: Course) => `${element.title}`,
      },
      {
        columnDef: 'secondLevel',
        header: 'Second Level',
        cell: (element: Course) => `${element.secondLevel}`,
      },
      {
        columnDef: 'teacher',
        header: 'Teacher',
        cell: (element: Course) => `${element.teacher}`,
      },
      {
        columnDef: 'class',
        header: 'Class',
        cell: (element: Course) => `${element.class}`,
      },
      {
        columnDef: 'active',
        header: 'Active',
        cell: (element: Course) => `${element.active ? 'Yes' : 'No'}`,
        styles: {
          isBold: true,
          isStatus: true,
        },
      },
      {
        columnDef: 'accepted',
        header: 'Accepted',
        cell: (element: Course) => `${element.accepted ? 'Yes' : 'No'}`,
        styles: {
          isBold: true,
          isStatus: true,
        },
      },
      {
        columnDef: 'showHomePage',
        header: 'Show in home page',
        cell: (element: Course) => `${element.showHomePage ? 'Yes' : 'No'}`,
        styles: {
          isBold: true,
          isStatus: true,
        },
      },
    ],
    actions: [
      {
        icon: 'ti ti-eye',
        color: 'primary',
        title: 'Show details',
        action: () => {},
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-edit',
        color: 'accent',
        title: 'Edit',
        action: () => {},
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-trash',
        color: 'warn',
        title: 'Delete',
        action: () => {},
        visibleCondition: () => true,
      },
    ],
    otherActions: [],
  };

  ngOnInit(): void {}

  onClickPrevButton() {
    this.navigationManagerService.navigateBack();
  }
}
