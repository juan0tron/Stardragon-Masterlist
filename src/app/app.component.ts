import { Component } from '@angular/core';

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

  constructor(public api:GemExchangeAPI){}

}
