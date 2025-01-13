import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
  state(
    'in-ltr',
    style({
      width: '250px',
    })
  ),
  state(
    'out-ltr',
    style({
      width: '80px',
    })
  ),
  state(
    'in-rtl',
    style({
      width: '250px',
    })
  ),
  state(
    'out-rtl',
    style({
      width: '80px',
    })
  ),
  transition('in-ltr => out-ltr', animate('700ms cubic-bezier(1, -0.4, 0.08, 1.34)')),
  transition('out-ltr => in-ltr', animate('700ms cubic-bezier(1, -0.4, 0.08, 1.34)')),
  transition('in-rtl => out-rtl', animate('700ms cubic-bezier(1, -0.4, 0.08, 1.34)')),
  transition('out-rtl => in-rtl', animate('700ms cubic-bezier(1, -0.4, 0.08, 1.34)')),
]);
