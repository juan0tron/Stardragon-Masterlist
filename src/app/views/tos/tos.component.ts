// Angular
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector:    'tos',
    templateUrl: 'tos.template.html'
})

export class TosComponent {

  constructor() {}

  scrollTo(anchor){
    let x = document.querySelector(`#${anchor}`);
    if (x){
      x.scrollIntoView();
    }
  }
}
