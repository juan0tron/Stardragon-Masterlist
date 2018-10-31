import { Component, Input } from '@angular/core';

import { Stardragon } from 'app/models/stardragon';

import { GemExchangeAPI } from 'app/services/api.service';

@Component({
  selector: 'stardragon-list',
  templateUrl: './stardragon-list.template.html',
  providers: [GemExchangeAPI]
})
export class StardragonListComponent {

  @Input() config:any = { dashboard: false };
  @Input() limit:number = 0;

  title = 'Stardragons';

  public stardragons:Array<Stardragon> = [];

  constructor(private gem: GemExchangeAPI){}

  ngOnInit(){
    this.list();
  }

  list() {
    this.gem.api(`/stardragons?limit=${this.limit}`, "GET").subscribe(
      data => { this.stardragons = data },
      ()   => {}
    );
  }
}
