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

export const shrinkExpand = trigger('shrinkExpand', [
  transition(':enter', [   // :enter is alias to 'void => *'
    style({opacity:0}),
    animate(500, style({opacity:1, height:'auto'}))
  ]),
  transition(':leave', [   // :leave is alias to '* => void'
    animate(500, style({ opacity: 0, overflow: 'hidden', height: 0}))
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
