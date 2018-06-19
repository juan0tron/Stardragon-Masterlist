import { trigger, animate, transition, style, stagger, query } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(
      ':leave',
      stagger(10, [ animate('0.1s', style({ opacity: 0, overflow: 'hidden', height: 0, width: 0 })) ] ),
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger(10, [ animate('0.5s', style({ opacity: 1 })) ] ),
      ],
      { optional: true }
    ),
  ])
]);

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    query(
      ':leave',
      stagger(50, [ animate('0.25s', style({ opacity: 0, overflow: 'hidden', height: 0, width: 0 })) ] ),
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger(150, [ animate('0.5s', style({ opacity: 1 })) ] ),
      ],
      { optional: true }
    ),
  ])
]);
