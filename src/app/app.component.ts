import { Component } from '@angular/core';

import { GemExchangeAPI } from './../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'app';

  public user_id = localStorage.getItem('user_id');

  constructor(public api:GemExchangeAPI){}

}
