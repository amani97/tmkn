import { CourseManagementType } from "../../../shared/enums/course-management-type.enum";

export interface ServiceCourse {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  priceOutCourse: number;
  active: boolean;
  availableForSale: boolean;
  type: CourseManagementType;
}
