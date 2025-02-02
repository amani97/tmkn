import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TmknAppRoutes } from '../../../shared/config';
import { apiResultFormat } from '../model/pages.model';
import { routes } from '../../../shared/routes/routes';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getDataTable() {
    return this.http.get<apiResultFormat>('json/data-tables.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getApproveRequest() {
    return this.http.get<apiResultFormat>('json/approve-request.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAcademicData() {
    return this.http.get<apiResultFormat>('json/academic-data.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCites() {
    return this.http.get<apiResultFormat>('json/cities.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getHolidays() {
    return this.http.get<apiResultFormat>('json/holidays.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getGuardian() {
    return this.http.get<apiResultFormat>('json/guardian-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getAttendanceReport() {
    return this.http.get<apiResultFormat>('json/attendance-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClass() {
    return this.http.get<apiResultFormat>('json/classes.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBlogCategories() {
    return this.http.get<apiResultFormat>('json/blog-categories.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassHomeWork() {
    return this.http.get<apiResultFormat>('json/class-home-work.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBlogComments() {
    return this.http.get<apiResultFormat>('json/blog-comments.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTransportVechile() {
    return this.http.get<apiResultFormat>('json/transport-vehicle.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTransportVechileDrivers() {
    return this.http
      .get<apiResultFormat>('json/transport-vehicle-drivers.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getUsers() {
    return this.http.get<apiResultFormat>('json/user.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getRolesPermission() {
    return this.http.get<apiResultFormat>('json/roles-permission.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBlogTags() {
    return this.http.get<apiResultFormat>('json/blog-tags.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassReport() {
    return this.http.get<apiResultFormat>('json/class-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getContactMessages() {
    return this.http.get<apiResultFormat>('json/contact-messages.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCountries() {
    return this.http.get<apiResultFormat>('json/countries.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassReportDate() {
    return this.http.get<apiResultFormat>('json/class-report-data.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDailyAttendance() {
    return this.http.get<apiResultFormat>('json/daily-attendance.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDeleteAccount() {
    return this.http.get<apiResultFormat>('json/delete-account.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDepartments() {
    return this.http.get<apiResultFormat>('json/departments.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTransactionData() {
    return this.http
      .get<apiResultFormat>('json/accounts_transactions_data.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getIncomeData() {
    return this.http.get<apiResultFormat>('json/accountincome.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoiceData() {
    return this.http.get<apiResultFormat>('json/account_invoice.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDesignation() {
    return this.http.get<apiResultFormat>('json/designation.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassRoom() {
    return this.http.get<apiResultFormat>('json/class_room.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getHostelRoom() {
    return this.http.get<apiResultFormat>('json/hostel-room.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassSyllabus() {
    return this.http.get<apiResultFormat>('json/class_syllabus.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFeesGroup() {
    return this.http.get<apiResultFormat>('json/fees-group.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassSubject() {
    return this.http.get<apiResultFormat>('json/class_subject.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getHostelRoomType() {
    return this.http.get<apiResultFormat>('json/hostel-room-type.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassSection() {
    return this.http.get<apiResultFormat>('json/class_section.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFeesMaster() {
    return this.http.get<apiResultFormat>('json/fees-master.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassRoutine() {
    return this.http.get<apiResultFormat>('json/class_routine.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getHostelList() {
    return this.http.get<apiResultFormat>('json/hostel-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFeesReport() {
    return this.http.get<apiResultFormat>('json/fees-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFeesType() {
    return this.http.get<apiResultFormat>('json/fees-type.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getGrade() {
    return this.http.get<apiResultFormat>('json/grade.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFeesCollect() {
    return this.http.get<apiResultFormat>('json/collect_fees.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getGradeReport() {
    return this.http.get<apiResultFormat>('json/grade-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getParentList() {
    return this.http.get<apiResultFormat>('json/parents-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getMembershipTransactions() {
    return this.http
      .get<apiResultFormat>('json/membership-transactions.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPayroll() {
    return this.http.get<apiResultFormat>('json/payroll.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPlayers() {
    return this.http.get<apiResultFormat>('json/players.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPermission() {
    return this.http.get<apiResultFormat>('json/permission.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPages() {
    return this.http.get<apiResultFormat>('json/pages.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFaqData() {
    return this.http.get<apiResultFormat>('json/faq.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStates() {
    return this.http.get<apiResultFormat>('json/states.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSports() {
    return this.http.get<apiResultFormat>('json/sports.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffAttendance() {
    return this.http.get<apiResultFormat>('json/staff-attendance.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFeesAssignData() {
    return this.http.get<apiResultFormat>('json/assign_fees.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffDayWise() {
    return this.http.get<apiResultFormat>('json/staff-day-wise.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getstudentLeaveAttendance() {
    return this.http
      .get<apiResultFormat>('json/studentLeaveAttendance.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStudentDayWise() {
    return this.http.get<apiResultFormat>('json/studentDayWiseData.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpenceData() {
    return this.http.get<apiResultFormat>('json/expense_data.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFeesRecord() {
    return this.http.get<apiResultFormat>('json/studentfeesRecord.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffLeaves() {
    return this.http.get<apiResultFormat>('json/staff-leaves.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffPayroll() {
    return this.http.get<apiResultFormat>('json/staff-payroll.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpenceCategoryData() {
    return this.http
      .get<apiResultFormat>('json/expenses_category_data.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getExamAttedance() {
    return this.http.get<apiResultFormat>('json/exam_attendance.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExamResult() {
    return this.http.get<apiResultFormat>('json/exam-result.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExamSchedule() {
    return this.http.get<apiResultFormat>('json/exam_schedule.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExamData() {
    return this.http.get<apiResultFormat>('json/exam.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLanguageData() {
    return this.http.get<apiResultFormat>('json/language.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLibraryMemberList() {
    return this.http.get<apiResultFormat>('json/libraryMemberList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBookIssueList() {
    return this.http.get<apiResultFormat>('json/bookIssueList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBookList() {
    return this.http.get<apiResultFormat>('json/bookList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getListLeaves() {
    return this.http.get<apiResultFormat>('json/list_leaves.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLeaveReport() {
    return this.http.get<apiResultFormat>('json/leave_report_data.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStudentReports() {
    return this.http.get<apiResultFormat>('json/student_reports.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTeacherAttendance() {
    return this.http.get<apiResultFormat>('json/teacher-attendance.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getScheduleClass() {
    return this.http.get<apiResultFormat>('json/scheduleClass.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffList() {
    return this.http.get<apiResultFormat>('json/staff.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStudentAttendnceType() {
    return this.http
      .get<apiResultFormat>('json/student-attendance-type.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStaffsAttendance() {
    return this.http.get<apiResultFormat>('json/staffs-attendance.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffReport() {
    return this.http.get<apiResultFormat>('json/staff-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStudentAttendance() {
    return this.http.get<apiResultFormat>('json/student-attendance.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTeacherDayWise() {
    return this.http.get<apiResultFormat>('json/teacher-day-wise.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTransportVehicle() {
    return this.http
      .get<apiResultFormat>('json/transport-assign-vehicle.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTransportPickupPoints() {
    return this.http
      .get<apiResultFormat>('json/transport-pickup-points.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTeacherLeaves() {
    return this.http.get<apiResultFormat>('json/teacher-leaves.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTeacherReport() {
    return this.http.get<apiResultFormat>('json/teacher-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTeachersList() {
    return this.http.get<apiResultFormat>('json/teachers-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTeacherSalary() {
    return this.http.get<apiResultFormat>('json/teacher-salary.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTestimonials() {
    return this.http.get<apiResultFormat>('json/testimonials.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTransportRoutes() {
    return this.http.get<apiResultFormat>('json/transport-routes.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStudent() {
    return this.http.get<apiResultFormat>('json/student-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFile(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/files.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getCallHistory(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('json/call-history.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public sidebarData1 = [
    {
      tittle: 'Main',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: false,
      base: '',
      page: '99',
      menu: [
        {
          menuValue: 'Dashboard',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'layout-2',
          base: 'dashboard',
          page: '1',
          subMenus: [
            {
              menuValue: 'Admin Dashboard',
              route: routes.adminDashboard,
              page: 'index',
            },
            {
              menuValue: 'Teacher Dashboard',
              route: routes.teacherDashboard,
              page: 'teacher-dashboard',
            },
            {
              menuValue: 'Student Dashboard',
              route: routes.studentDashboard,
              page: 'student-dashboard',
            },
            {
              menuValue: 'Parent Dashboard',
              route: routes.parentDashboard,
              page: 'parent-dashboard',
            },
          ],
        },
        {
          menuValue: 'Courses',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'square-rotated-forbid-2',
          route: `${TmknAppRoutes.Dashboard}/${TmknAppRoutes.CourseManagement}`,
          base: 'class-section',
          base2: '',
          base3: '',
          base4: '',
          base5: '',
          base6: '',
          base7: '',
          base8: '',
          base9: '',
          customSubmenuTwo: false,
          subRoutes: [],
        },
        {
          menuValue: 'Examination',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'square-rotated-forbid-2',
          route: `${TmknAppRoutes.Dashboard}/${TmknAppRoutes.Examinations}`,
          base: 'class-section',
          base2: '',
          base3: '',
          base4: '',
          base5: '',
          base6: '',
          base7: '',
          base8: '',
          base9: '',
          customSubmenuTwo: false,
          subRoutes: [],
        },
      ],
    },
  ];

  public videocall = [
    {
      img: 'assets/img/users/user-01.jpg',
      name: 'Barbara',
    },
    {
      img: 'assets/img/users/user-02.jpg',
      name: 'Linnea',
    },
    {
      img: 'assets/img/users/user-05.jpg',
      name: 'Richard',
    },
    {
      img: 'assets/img/users/user-03.jpg',
      name: 'Freda',
    },
  ];
}
