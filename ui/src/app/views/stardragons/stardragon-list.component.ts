import { Component } from '@angular/core';

import { GemExchangeAPI } from './../../../api.service';

@Component({
  selector: 'stardragon-list',
  templateUrl: './stardragon-list.template.html',
  providers: [GemExchangeAPI]
})
export class StarDragonListComponent {

  title = 'StarDragons';

  public stardragons:any;

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
