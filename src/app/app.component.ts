import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { fadeAnimation } from './animations/router.animations';

import * as moment from 'moment';

import { GemExchangeAPI } from 'app/services/api.service';

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
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ){}

  ngOnInit(){
    // Subscribe to all router events here
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        // Always scroll to top when page is changed
        window.scrollTo(0, 0);
        // Reset page title
        this.titleService.setTitle('The Gem Exchange');
      });
  }

}
