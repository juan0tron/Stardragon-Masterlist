import { Component } from '@angular/core';

import { StarDragon } from './stardragon';

import { GemExchangeAPI } from './../../../services/api.service';

@Component({
  selector: 'stardragon-list',
  templateUrl: './stardragon-list.template.html',
  providers: [GemExchangeAPI]
})
export class StarDragonListComponent {

  title = 'StarDragons';

  public stardragons:Array<StarDragon> = [];

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
