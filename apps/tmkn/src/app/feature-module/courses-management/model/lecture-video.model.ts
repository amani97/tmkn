import { MediaContentType } from '../../../shared/enums/media-content-type.enum';

export interface LectureVideo {
  id?: number;
  title: string;
  titleAr: string;
  active: boolean;
  video: string;
  type: MediaContentType;
}
