import { MediaContentType } from '../../../shared/enums/media-content-type.enum';

export interface MediaContent {
  id: number;
  title: string;
  description: string;
  type: MediaContentType;
}
