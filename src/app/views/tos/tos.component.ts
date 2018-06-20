// Angular
import { Component } from '@angular/core';
import { Router }    from '@angular/router';

// 3rd Party
import { LoginResponse, LoginOptions, FacebookService, InitParams } from 'ngx-facebook';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

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
