export class routes {
  private static Url = '';

  public static get baseUrl(): string {
    return this.Url;
  }

  //ui-interface routes
  public static get baseUi(): string {
    return this.baseUrl + '/base-ui';
  }
  public static get avatar(): string {
    return this.baseUi + '/ui-avatar';
  }
  public static get alerts(): string {
    return this.baseUi + '/ui-alerts';
  }
  public static get cards(): string {
    return this.baseUi + '/ui-cards';
  }
  public static get buttons(): string {
    return this.baseUi + '/ui-buttons';
  }
  public static get accordion(): string {
    return this.baseUi + '/ui-accordion';
  }
  public static get uiPopovers(): string {
    return this.baseUi + '/ui-popovers';
  }
  public static get uiPlaceholders(): string {
    return this.baseUi + '/ui-placeholders';
  }
  public static get uiBadges(): string {
    return this.baseUi + '/ui-badges';
  }
  public static get uiBreadcrumb(): string {
    return this.baseUi + '/ui-breadcrumb';
  }
  public static get uiButtons(): string {
    return this.baseUi + '/ui-buttons';
  }
  public static get uiButtonsGroup(): string {
    return this.baseUi + '/ui-buttons-group';
  }
  public static get uiCards(): string {
    return this.baseUi + '/ui-cards';
  }
  public static get uiCarousel(): string {
    return this.baseUi + '/ui-carousel';
  }
  public static get uiCounter(): string {
    return this.baseUi + '/ui-counter';
  }
  public static get uiDropdowns(): string {
    return this.baseUi + '/ui-dropdowns';
  }
  public static get uiGrid(): string {
    return this.baseUi + '/ui-grid';
  }
  public static get uiImages(): string {
    return this.baseUi + '/ui-images';
  }
  public static get uiLightbox(): string {
    return this.baseUi + '/ui-lightbox';
  }
  public static get uiMedia(): string {
    return this.baseUi + '/ui-media';
  }
  public static get uiModals(): string {
    return this.baseUi + '/ui-modals';
  }
  public static get uiNavTabs(): string {
    return this.baseUi + '/ui-nav-tabs';
  }
  public static get uiOffcanvas(): string {
    return this.baseUi + '/ui-offcanvas';
  }
  public static get uiPagination(): string {
    return this.baseUi + '/ui-pagination';
  }
  public static get uiProgress(): string {
    return this.baseUi + '/ui-progress';
  }
  public static get uiRangeSlider(): string {
    return this.baseUi + '/ui-rangeslider';
  }
  public static get uiSpinner(): string {
    return this.baseUi + '/ui-spinner';
  }
  public static get uiSweetAlerts(): string {
    return this.baseUi + '/ui-sweetalerts';
  }
  public static get uiToasts(): string {
    return this.baseUi + '/ui-toasts';
  }
  public static get uiTooltips(): string {
    return this.baseUi + '/ui-tooltips';
  }
  public static get uiTypography(): string {
    return this.baseUi + '/ui-typography';
  }
  public static get uiVideo(): string {
    return this.baseUi + '/ui-video';
  }
  public static get uiAccordion(): string {
    return this.baseUi + '/ui-accordion';
  }
  public static get uiAvatar(): string {
    return this.baseUi + '/ui-avatar';
  }
  public static get uiBorders(): string {
    return this.baseUi + '/ui-borders';
  }
  public static get uiColors(): string {
    return this.baseUi + '/ui-colors';
  }
  public static get table(): string {
    return this.baseUrl + '/table';
  }
  public static get forms(): string {
    return this.baseUrl + '/forms';
  }
  public static get icons(): string {
    return this.baseUrl + '/icons';
  }
  public static get advancedUi(): string {
    return this.baseUrl + '/advanced-ui';
  }
  public static get counter(): string {
    return this.advancedUi + '/ui-counter';
  }
  public static get clipboard(): string {
    return this.advancedUi + '/ui-clipboard';
  }
  public static get ribbon(): string {
    return this.advancedUi + '/ui-ribbon';
  }
  public static get rating(): string {
    return this.advancedUi + '/ui-rating';
  }
  public static get textEditor(): string {
    return this.advancedUi + '/ui-text-editor';
  }
  public static get scrollbar(): string {
    return this.advancedUi + '/ui-scrollbar';
  }
  public static get timeline(): string {
    return this.advancedUi + '/ui-timeline';
  }
  public static get dragDrop(): string {
    return this.advancedUi + '/ui-drag-drop';
  }
  public static get charts(): string {
    return this.baseUrl + '/charts';
  }
  public static get chartApex(): string {
    return this.charts + '/chart-apex';
  }
  public static get chartNg2(): string {
    return this.charts + '/chart-ng2';
  }
  public static get chartPrime(): string {
    return this.charts + '/prime-ng';
  }
  public static get basicTable(): string {
    return this.table + '/tables-basic';
  }
  public static get dataTable(): string {
    return this.table + '/data-basic';
  }
  public static get formBasicInputs(): string {
    return this.forms + '/form-basic-inputs';
  }
  public static get formInputsGroups(): string {
    return this.forms + '/form-input-groups';
  }
  public static get formHorizontal(): string {
    return this.forms + '/form-horizontal';
  }
  public static get formVertical(): string {
    return this.forms + '/form-vertical';
  }
  public static get formMask(): string {
    return this.forms + '/form-mask';
  }
  public static get formValidation(): string {
    return this.forms + '/form-validation';
  }
  public static get formSelect(): string {
    return this.forms + '/form-select';
  }
  public static get formFileUpload(): string {
    return this.forms + '/form-fileupload';
  }
  public static get formCheckboxRadios(): string {
    return this.forms + '/form-checkbox-radios';
  }
  public static get formWizard(): string {
    return this.forms + '/form-wizard';
  }
  public static get formElements(): string {
    return this.forms + '/form-elements';
  }
  public static get formGridGutters(): string {
    return this.forms + '/form-grid-gutters';
  }
  public static get formSelect2(): string {
    return this.forms + '/form-select-2';
  }
  public static get formFloatingLabels(): string {
    return this.forms + '/form-floating-labels';
  }
  public static get iconFontAwesome(): string {
    return this.icons + '/icon-fontawesome';
  }
  public static get iconFeather(): string {
    return this.icons + '/icon-feather';
  }
  public static get iconIonic(): string {
    return this.icons + '/icon-ionic';
  }
  public static get iconMaterial(): string {
    return this.icons + '/icon-material';
  }
  public static get iconPe7(): string {
    return this.icons + '/icon-pe7';
  }
  public static get iconSimpleline(): string {
    return this.icons + '/icon-simpleline';
  }
  public static get iconWeather(): string {
    return this.icons + '/icon-weather';
  }
  public static get iconThemify(): string {
    return this.icons + '/icon-themify';
  }
  public static get iconTypicon(): string {
    return this.icons + '/icon-typicon';
  }
  public static get iconFlag(): string {
    return this.icons + '/icon-flag';
  }

  //Academic

  public static get academic(): string {
    return this.baseUrl + '/academic';
  }
  public static get academicReasons(): string {
    return this.academic + '/academic-reasons';
  }
  public static get classRoom(): string {
    return this.academic + '/class-room';
  }
  public static get classTimeTable(): string {
    return this.academic + '/class-time-table';
  }
  public static get classSyllabus(): string {
    return this.academic + '/class-syllabus';
  }
  public static get classSubject(): string {
    return this.academic + '/class-subject';
  }
  public static get classSection(): string {
    return this.academic + '/class-section';
  }
  public static get classRoutine(): string {
    return this.academic + '/class-routine';
  }
  public static get scheduleClasses(): string {
    return this.academic + '/classes/schedule-classes';
  }
  public static get classes(): string {
    return this.academic + '/classes/class-list';
  }
  public static get classHomeWork(): string {
    return this.academic + '/class-home-work';
  }
  public static get grade(): string {
    return this.academic + '/examinations/grade';
  }
  public static get examResults(): string {
    return this.academic + '/examinations/exam-results';
  }
  public static get examAttendance(): string {
    return this.academic + '/examinations/exam-attendance';
  }
  public static get examSchedule(): string {
    return this.academic + '/examinations/exam-schedule';
  }
  public static get examList(): string {
    return this.academic + '/examinations/exam-list';
  }

  //user-management routes
  public static get userManagement(): string {
    return this.baseUrl + '/user-management';
  }
  public static get rolesPermision(): string {
    return this.userManagement + '/roles-permission';
  }
  public static get users(): string {
    return this.userManagement + '/users';
  }
  public static get deleteAccount(): string {
    return this.userManagement + '/delete-account';
  }
  public static get Permission(): string {
    return this.userManagement + '/permission';
  }

  //peoples routes
  public static get peoples(): string {
    return this.baseUrl + '/peoples';
  }
  public static get addTeacher(): string {
    return this.peoples + '/teachers/add-teacher';
  }
  public static get editTeacher(): string {
    return this.peoples + '/teachers/edit-teacher';
  }
  public static get teacherRoutine(): string {
    return this.peoples + '/teachers/teachers-routine';
  }
  public static get guardiansList(): string {
    return this.peoples + '/guardians/guardian-list';
  }
  public static get guardiansGrid(): string {
    return this.peoples + '/guardians/guardian-grid';
  }
  public static get studentResult(): string {
    return this.peoples + '/student/student-result';
  }
  public static get editStudent(): string {
    return this.peoples + '/students/edit-student';
  }
  public static get parentGrid(): string {
    return this.peoples + '/parents/parent-grid';
  }
  public static get parentList(): string {
    return this.peoples + '/parents/parents-list';
  }
  public static get addStudent(): string {
    return this.peoples + '/students/add-student';
  }
  public static get teacherLeaves(): string {
    return this.peoples + '/teachers/teacher-leaves';
  }
  public static get teachersList(): string {
    return this.peoples + '/teachers/teachers-list';
  }
  public static get teacherGrid(): string {
    return this.peoples + '/teachers/teacher-grid';
  }
  public static get teacherSalary(): string {
    return this.peoples + '/teachers/teacher-salary';
  }
  public static get studentDetails(): string {
    return this.peoples + '/students/student-details';
  }
  public static get teacherDetails(): string {
    return this.peoples + '/teachers/teacher-details';
  }
  public static get studentsList(): string {
    return this.peoples + '/students/students-list';
  }
  public static get studentsGrid(): string {
    return this.peoples + '/students/student-grid';
  }
  public static get studentPromotion(): string {
    return this.peoples + '/students/student-promotion';
  }
  public static get studentFees(): string {
    return this.peoples + '/students/student-fees';
  }
  public static get studentLeaves(): string {
    return this.peoples + '/students/student-leaves';
  }
  public static get studentList(): string {
    return this.peoples + '/students/students-list';
  }
  public static get teacherLibrary(): string {
    return this.peoples + '/teachers/teacher-library';
  }
  public static get studentLibrary(): string {
    return this.peoples + '/students/student-library';
  }
  public static get studentTimeTable(): string {
    return this.peoples + '/students/student-time-table';
  }

 
  

  //hrm routes
  public static get hrm(): string {
    return this.baseUrl + '/hrm';
  }
  public static get leaves(): string {
    return this.baseUrl + '/leaves';
  }
  public static get approveRequest(): string {
    return this.hrm + this.leaves + '/approve-request';
  }
  public static get listLeaves(): string {
    return this.hrm + this.leaves + '/list-leaves';
  }
  public static get departments(): string {
    return this.hrm + '/departments';
  }
  public static get designation(): string {
    return this.hrm + '/designation';
  }
  public static get holiday(): string {
    return this.hrm + '/holidays';
  }
  public static get payRoll(): string {
    return this.hrm + '/payroll';
  }
  public static get addStaff(): string {
    return this.hrm + '/staff/add-staff';
  }
  public static get editStaff(): string {
    return this.hrm + '/staff/edit-staff';
  }
  public static get teacherAttendance(): string {
    return this.hrm + '/attendance/teacher-attendance';
  }
  public static get staffAttendance(): string {
    return this.hrm + '/attendance/staff-attendance';
  }
  public static get staffsAttendance(): string {
    return this.hrm + '/attendance/staffs-attendance';
  }
  public static get studentAttendance(): string {
    return this.hrm + '/attendance/student-attendance';
  }
  public static get staffDetails(): string {
    return this.hrm + '/staff/staff-details';
  }
  public static get staffLeaves(): string {
    return this.hrm + '/staff/staff-leaves';
  }
  public static get staffPayroll(): string {
    return this.hrm + '/staff/staff-payroll';
  }
  public static get staffList(): string {
    return this.hrm + '/staff/staff-list';
  }

  //reports routes
  public static get reports(): string {
    return this.baseUrl + '/reports';
  }
  public static get attendanceReport(): string {
    return this.reports + '/attendance-report';
  }
  public static get classReport(): string {
    return this.reports + '/class-report';
  }
  public static get dailyAttendance(): string {
    return this.reports + '/daily-attendance';
  }
  public static get gradeReport(): string {
    return this.reports + '/grade-report';
  }
  public static get feesReport(): string {
    return this.reports + '/fees-report';
  }
  public static get staffDayWise(): string {
    return this.reports + '/staff-day-wise';
  }
  public static get studentAttendanceType(): string {
    return this.reports + '/student-attendance-type';
  }
  public static get staffReport(): string {
    return this.reports + '/staff-report';
  }
  public static get leaveReport(): string {
    return this.reports + '/leave-report';
  }
  public static get teacherDayWise(): string {
    return this.reports + '/teacher-day-wise';
  }
  public static get teacherReport(): string {
    return this.reports + '/teacher-report';
  }
  public static get studentDayWise(): string {
    return this.reports + '/student-day-wise';
  }
  public static get studentReport(): string {
    return this.reports + '/student-report';
  }

  //settings routes
  //app-settings
  public static get appSettings(): string {
    return this.baseUrl + '/app-settings';
  }
  public static get customFields(): string {
    return this.appSettings + '/custom-fields';
  }
  public static get invoiceSettings(): string {
    return this.appSettings + '/invoice-settings';
  }

  //general-settings
  public static get generalSettings(): string {
    return this.baseUrl + '/general-settings';
  }
  public static get connectedApps(): string {
    return this.generalSettings + '/connected-apps';
  }
  public static get profileSettings(): string {
    return this.generalSettings + '/profile-settings';
  }
  public static get securitySettings(): string {
    return this.generalSettings + '/security-settings';
  }
  public static get notificationsSettings(): string {
    return this.generalSettings + '/notification-settings';
  }

  //academic-settings
  public static get academicSettings(): string {
    return this.baseUrl + '/academic-settings';
  }
  public static get schoolSettings(): string {
    return this.academicSettings + '/school-settings';
  }
  public static get religion(): string {
    return this.academicSettings + '/religion';
  }

  //other-settings
  public static get otherSettings(): string {
    return this.baseUrl + '/other-settings';
  }
  public static get banIpAddress(): string {
    return this.otherSettings + '/ban-ip-address';
  }
  public static get storage(): string {
    return this.otherSettings + '/storage';
  }

  //system setting
  public static get systemSettings(): string {
    return this.baseUrl + '/system-settings';
  }
  public static get emailSettings(): string {
    return this.systemSettings + '/email-settings';
  }
  public static get emailTemplates(): string {
    return this.systemSettings + '/email-templates';
  }
  public static get gdprCookies(): string {
    return this.systemSettings + '/gdpr-cookies';
  }
  public static get otpSettings(): string {
    return this.systemSettings + '/otp-settings';
  }
  public static get smsSettings(): string {
    return this.systemSettings + '/sms-settings';
  }

  //website settings
  public static get websiteSettings(): string {
    return this.baseUrl + '/website-settings';
  }
  public static get localization(): string {
    return this.websiteSettings + '/localization';
  }
  public static get companySetting(): string {
    return this.websiteSettings + '/company-settings';
  }
  public static get socialAuthentication(): string {
    return this.websiteSettings + '/social-authentication';
  }
  public static get preferences(): string {
    return this.websiteSettings + '/preferences';
  }
  public static get prefixes(): string {
    return this.websiteSettings + '/prefixes';
  }
  public static get language(): string {
    return this.websiteSettings + '/language-settings';
  }
  public static get companySettings(): string {
    return this.websiteSettings + '/company-settings';
  }
  // public static get language(): string {
  //   return this.websiteSettings + '/language';
  // }

  //support routes
  public static get support(): string {
    return this.baseUrl + '/support';
  }
  public static get contactMessages(): string {
    return this.support + '/contact-messages';
  }
  public static get ticketDetails(): string {
    return this.support + '/tickets/ticket-details';
  }
  public static get ticketGrid(): string {
    return this.support + '/tickets/ticket-grid';
  }
  public static get ticketsList(): string {
    return this.support + '/tickets/ticket';
  }

  // Financial settings
  public static get financialSettings(): string {
    return this.baseUrl + '/financial-settings';
  }
  public static get paymentGateway(): string {
    return this.financialSettings + '/payment-gateways';
  }
  public static get taxRates(): string {
    return this.financialSettings + '/tax-rates';
  }

  //content routes
  public static get content(): string {
    return this.baseUrl + '/content';
  }
  public static get blog(): string {
    return this.baseUrl + '/blog';
  }
  public static get allBlog(): string {
    return this.content + this.blog + '/all-blog';
  }
  public static get blogCategories(): string {
    return this.content + this.blog + '/blog-categories';
  }
  public static get blogComments(): string {
    return this.content + this.blog + '/blog-comments';
  }
  public static get blogTags(): string {
    return this.content + this.blog + '/blog-tags';
  }
  public static get faq(): string {
    return this.content + '/faq';
  }
  public static get testimonials(): string {
    return this.content + '/testimonials';
  }
  //pages routes
  public static get pages(): string {
    return this.baseUrl + '/pages';
  }
  public static get activities(): string {
    return this.pages + '/activities';
  }
  public static get profile(): string {
    return this.pages + '/profile';
  }

  //FINANCE & ACCOUNTS

  public static get financeAccounts(): string {
    return this.baseUrl + '/accounts';
  }
  public static get transactions(): string {
    return this.financeAccounts + '/transactions';
  }
  public static get income(): string {
    return this.financeAccounts + '/income';
  }
  public static get invoice(): string {
    return this.financeAccounts + '/invoice';
  }
  public static get accountsInvoices(): string {
    return this.financeAccounts + '/accounts-invoices';
  }
  public static get addInvoice(): string {
    return this.financeAccounts + '/add-invoice';
  }
  public static get editInvoice(): string {
    return this.financeAccounts + '/edit-invoice';
  }
  public static get expenses(): string {
    return this.financeAccounts + '/expenses';
  }
  public static get expensesCategory(): string {
    return this.financeAccounts + '/expenses-category';
  }

  //content routing
  public static get pagesMain(): string {
    return this.content + '/pages';
  }
  //location
  public static get cities(): string {
    return this.content + '/location/cities';
  }
  public static get countries(): string {
    return this.content + '/location/countries';
  }
  public static get states(): string {
    return this.content + '/location/states';
  }

  //management
  public static get management(): string {
    return this.baseUrl + '/management';
  }
  public static get transportVehicle(): string {
    return this.management + '/transport/transport-vehicle';
  }
  public static get transportVehicleDrivers(): string {
    return this.management + '/transport/transport-vehicle-drivers';
  }

  public static get hostelRooms(): string {
    return this.management + '/hostel/hostel-rooms';
  }
  public static get hostelRoomType(): string {
    return this.management + '/hostel/hostel-room-type';
  }
  public static get hostelList(): string {
    return this.management + '/hostel/hostel-list';
  }
  public static get feesGroup(): string {
    return this.management + '/fees-collection/fees-group';
  }
  public static get feesMaster(): string {
    return this.management + '/fees-collection/fees-master';
  }
  public static get feesType(): string {
    return this.management + '/fees-collection/fees-type';
  }
  public static get collectFees(): string {
    return this.management + '/fees-collection/collect-fees';
  }
  public static get players(): string {
    return this.management + '/players';
  }
  public static get feesAssign(): string {
    return this.management + '/fees-collection/fees-assign';
  }
  public static get sports(): string {
    return this.management + '/sports';
  }
  public static get transportAssignVehicle(): string {
    return this.management + '/transport/transport-assign-vehicle';
  }
  public static get transportPickupPoints(): string {
    return this.management + '/transport/transport-pickup-points';
  }
  public static get transportRoutes(): string {
    return this.management + '/transport/trasnsport-routes';
  }

  //announcements routes
  public static get announcements(): string {
    return this.baseUrl + '/announcements';
  }
  public static get events(): string {
    return this.announcements + '/event';
  }
  public static get noticeBoard(): string {
    return this.announcements + '/notice-board';
  }

  //main routes
  //dashboard
  public static get dashboard(): string {
    return this.baseUrl + '/dashboard';
  }
  public static get adminDashboard(): string {
    return this.dashboard + '/index';
  }
  public static get parentDashboard(): string {
    return this.dashboard + '/parent-dashboard';
  }
  public static get teacherDashboard(): string {
    return this.dashboard + '/teacher-dashboard';
  }
  public static get studentDashboard(): string {
    return this.dashboard + '/student-dashboard';
  }
  // application
  public static get application(): string {
    return this.baseUrl + '/application';
  }
  public static get chat(): string {
    return this.application + '/chat';
  }
  public static get email(): string {
    return this.application + '/email';
  }
  public static get fileManager(): string {
    return this.application + '/file-manager';
  }
  public static get callHistory(): string {
    return this.application + '/call-history';
  }
  public static get fileArchived(): string {
    return this.application + '/file-archived';
  }
  public static get fileDocument(): string {
    return this.application + '/file-document';
  }
  public static get fileFavorites(): string {
    return this.application + '/file-favourites';
  }
  public static get fileManagerDeleted(): string {
    return this.application + '/file-manager-deleted';
  }
  public static get fileRecent(): string {
    return this.application + '/file-recent';
  }
  public static get audioCall(): string {
    return this.application + '/audio-call';
  }
  public static get videoCall(): string {
    return this.application + '/video-call';
  }
  public static get toDo(): string {
    return this.application + '/todo';
  }
  public static get notes(): string {
    return this.application + '/notes';
  }
  public static get fileShared(): string {
    return this.application + '/file-shared';
  }
 
  public static get calendar(): string {
    return this.application + '/calendar';
  }

  //membership routes
  public static get membership(): string {
    return this.baseUrl + '/membership';
  }
  public static get membershipAddons(): string {
    return this.membership + '/membership-addons';
  }
  public static get membershipPlans(): string {
    return this.membership + '/membership-plans';
  }
  public static get membershipTransactions(): string {
    return this.membership + '/membership-transactions';
  }
  //Library

   public static get issueBook(): string {
    return this.management + '/library/issue-book';
  }
   public static get returnBook(): string {
    return this.management + '/library/return-book';
  }
  public static get Books(): string {
    return this.management + '/library/books';
  }
  public static get libraryMembers(): string {
    return this.management + '/library/library-members';
  }
  // authentication routes

  public static get login(): string {
    return this.baseUrl + '/login';
  }
  public static get emailVerification(): string {
    return this.baseUrl + '/email-verification';
  }
  public static get emailVerification2(): string {
    return this.baseUrl + '/email-verification-2';
  }
  public static get emailVerification3(): string {
    return this.baseUrl + '/email-verification-3';
  }
  public static get register(): string {
    return this.baseUrl + '/register';
  }
  public static get forgotPassword(): string {
    return this.baseUrl + '/forgot-password';
  }
  public static get forgotPassword2(): string {
    return this.baseUrl + '/forgot-password-2';
  }
  public static get forgotPassword3(): string {
    return this.baseUrl + '/forgot-password-3';
  }
  public static get lockScreen(): string {
    return this.baseUrl + '/lock-screen';
  }
  public static get twoStepVerfication(): string {
    return this.baseUrl + '/two-step-verification';
  }
  public static get comingSoon(): string {
    return this.pages + '/coming-soon';
  }
  public static get underMaintenance(): string {
    return this.pages + '/under-maintenance';
  }
  public static get blankPage(): string {
    return this.pages + '/blank-page';
  }
  public static get errorPages(): string {
    return this.baseUrl + '/error-pages';
  }
  public static get error404(): string {
    return this.errorPages + '/error-404';
  }
  public static get error500(): string {
    return this.errorPages + '/error-500';
  }
  public static get success(): string {
    return this.baseUrl + '/reset-password-success';
  }
  public static get success2(): string {
    return this.baseUrl + '/reset-password-success-2';
  }
  public static get success3(): string {
    return this.baseUrl + '/reset-password-success-3';
  }
  public static get register2(): string {
    return this.baseUrl + '/register-2';
  }
  public static get register3(): string {
    return this.baseUrl + '/register-3';
  }
  public static get login2(): string {
    return this.baseUrl + '/login-2';
  }
  public static get login3(): string {
    return this.baseUrl + '/login-3';
  }
  public static get twoStepVerfication2(): string {
    return this.baseUrl + '/two-step-verification-2';
  }
  public static get twoStepVerfication3(): string {
    return this.baseUrl + '/two-step-verification-3';
  }
  public static get resetPasseword(): string {
    return this.baseUrl + '/reset-password';
  }
  public static get resetPasseword2(): string {
    return this.baseUrl + '/reset-password-2';
  }
  public static get resetPasseword3(): string {
    return this.baseUrl + '/reset-password-3';
  }
  //layout
  public static get layoutDefault(): string {
    return this.baseUrl + '/layout-default';
  }
  public static get layoutMini(): string {
    return this.baseUrl + '/layout-mini';
  }
  public static get layoutRtl(): string {
    return this.dashboard + '/layout-rtl';
  }
  public static get layoutBox(): string {
    return this.baseUrl + '/layout-box';
  }
  public static get layoutDark(): string {
    return this.baseUrl + '/layout-dark';
  }
 

}


