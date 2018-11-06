// dev.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

import { Http, RequestOptions, URLSearchParams } from '@angular/http';

import { AuthService } from 'app/services/auth.service';

@Injectable()

export class DevGuard implements CanActivate {

    constructor(
      private router: Router,
      private route:  ActivatedRoute,
      public  auth:   AuthService
    ) {}

    /**
     *  @function canActivate()
     *  @description Checks if a user is allowed to navigate to a page.
     *  @return {boolean}
     */
    canActivate() {
      if(!this.auth.isDev()){
        this.router.navigate(['/']);
      }
      return this.auth.isDev();
    }
}
