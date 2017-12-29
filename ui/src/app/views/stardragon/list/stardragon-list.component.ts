import { Component } from '@angular/core';

import { Stardragon } from './../../../models/stardragon';

import { GemExchangeAPI } from './../../../../services/api.service';

@Component({
  selector: 'stardragon-list',
  templateUrl: './stardragon-list.template.html',
  providers: [GemExchangeAPI]
})
export class StardragonListComponent {

  title = 'Stardragons';

  public stardragons:Array<Stardragon> = [];

  constructor(private gem: GemExchangeAPI){}

  ngOnInit(){
    this.list();
  }

  list() {
    this.gem.api("/stardragon/list", "get").subscribe(
      data => {
        this.stardragons = data;
      },
      err  => {},
      ()   => {}
    );
  }
}
