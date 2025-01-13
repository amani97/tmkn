import { CourseManagementType } from "../../../shared/enums/course-management-type.enum";

export interface PaperNote {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  image: string;
  type: CourseManagementType;
}
