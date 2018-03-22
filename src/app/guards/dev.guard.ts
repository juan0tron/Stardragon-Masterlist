// dev.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

import { Http, RequestOptions, URLSearchParams } from '@angular/http';

import { GemExchangeAPI } from './../../services/api.service';

@Injectable()

export class DevGuard implements CanActivate {

    constructor(
      private router: Router,
      private route:  ActivatedRoute,
      public  api:    GemExchangeAPI
    ) {}

    /**
     *  @function canActivate()
     *  @description Checks if a user is allowed to navigate to a page.
     *  @return {boolean}
     */
    canActivate() {
      if(!this.api.isDev()){
        this.router.navigate(['/login']);
      }
      return this.api.isDev();
    }
}
