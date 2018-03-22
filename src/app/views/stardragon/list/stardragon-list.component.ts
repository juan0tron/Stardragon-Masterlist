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
    this.gem.api("/stardragons", "GET").subscribe(
      data => {
        this.stardragons = data;
        console.log(this.stardragons)
      },
      err  => {},
      ()   => {}
    );
  }
}
