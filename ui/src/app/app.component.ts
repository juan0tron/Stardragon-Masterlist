import { Component } from '@angular/core';

import { GemExchangeAPI } from './../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'app';

  constructor(public api:GemExchangeAPI){}
}
