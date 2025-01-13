import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Observable, interval, Subject, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private onDestroy$ = new Subject<void>();
  transform(startDate: string | Date, updateInterval = 1000, withoutSuffix = false): Observable<string> {
    const start = dayjs(startDate);

    return interval(updateInterval).pipe(
      takeUntil(this.onDestroy$),
      map(() => start.fromNow(withoutSuffix))
    );
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
