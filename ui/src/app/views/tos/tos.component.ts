import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { LoginResponse, LoginOptions, FacebookService, InitParams } from 'ngx-facebook';

import { GemExchangeAPI } from './../../../services/api.service';

@Component({
    selector:    'tos',
    templateUrl: 'tos.template.html',
    providers:   [GemExchangeAPI]
})

export class TosComponent {

  constructor(
    private api:    GemExchangeAPI,
    private fb:     FacebookService,
    private router: Router
  ) { }


}
