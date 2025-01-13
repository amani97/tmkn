import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 20, wordSensitive = false, suffix = '...'): string {
    if (!value || value?.length <= 0) {
      return value;
    }
    if (wordSensitive) {
      const lastWordCharacterIndex = value.substring(0, limit).lastIndexOf(' ');
      if (lastWordCharacterIndex > 0) {
        limit = lastWordCharacterIndex;
      }
    }
    return value.length > limit ? value.substring(0, limit) + suffix : value;
  }
}
