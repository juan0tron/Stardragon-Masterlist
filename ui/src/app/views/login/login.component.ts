import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { GemExchangeAPI } from './../../../services/api.service';

@Component({
    selector:    'login',
    templateUrl: 'login.template.html',
    providers:   [GemExchangeAPI]
})

export class LoginComponent {

  private login_type = "";

  constructor(
    private api:    GemExchangeAPI,
    private router: Router
  ) {}

}
