import { trigger, animate, transition, style, state, query } from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
  state('show', style({transform: 'translateX(0)'})),
  state('hide', style({transform: 'translateX(-100%)'})),
  transition('* => *', animate(300))
]);

export const fadeBackground = trigger('fadeBackground', [
  state('show', style({opacity:.5})),
  state('hide', style({opacity:0})),
  transition('* => *', animate(300))
]);
