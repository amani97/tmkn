import { MediaContentType } from "../../../shared/enums/media-content-type.enum";

export interface LectureNote {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  file: string;
  isActive: boolean;
  isShareable: boolean;
  type: MediaContentType;
}
