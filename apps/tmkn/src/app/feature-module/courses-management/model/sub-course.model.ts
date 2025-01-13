import { CourseManagementType } from '../../../shared/enums/course-management-type.enum';

export interface SubCourse {
  id: number;
  title: string;
  titleAr: string;
  price: number;
  priceAfterDiscount: number;
  activeAttendee: boolean;
  type: CourseManagementType;
}
