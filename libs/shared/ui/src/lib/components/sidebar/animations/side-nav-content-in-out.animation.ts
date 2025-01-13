import { trigger, state, style, transition, animate } from '@angular/animations';

export const sidenavContentInOut = trigger('sidenavContentInOut', [
  state(
    'in-ltr',
    style({
      'margin-left': '250px',
    })
  ),
  state(
    'out-ltr',
    style({
      'margin-left': '80px',
    })
  ),
  state(
    'in-rtl',
    style({
      'margin-right': '250px',
    })
  ),
  state(
    'out-rtl',
    style({
      'margin-right': '80px',
    })
  ),
  transition('in-ltr => out-ltr', animate('700ms cubic-bezier(1, -0.4, 0.08, 1.34)')),
  transition('out-ltr => in-ltr', animate('700ms cubic-bezier(1, -0.4, 0.08, 1.34)')),
  transition('in-rtl => out-rtl', animate('700ms cubic-bezier(1, -0.4, 0.08, 1.34)')),
  transition('out-rtl => in-rtl', animate('700ms cubic-bezier(1, -0.4, 0.08, 1.34)')),
]);
