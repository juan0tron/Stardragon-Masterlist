import { Component } from '@angular/core';
import { Router, NavigationEnd }     from '@angular/router';

import { fadeAnimation } from './animations/router.animations';

import * as moment from 'moment';

import { GemExchangeAPI } from './../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations:[fadeAnimation]
})

export class AppComponent {
  title = 'app';

  public user_id = localStorage.getItem('user_id');

  constructor(
    public api:GemExchangeAPI,
    private router:Router
  ){}

  ngOnInit(){
    // Scroll to the top of the page on every page change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) { return; }
      window.scrollTo(0, 0);
    });
  }

}
