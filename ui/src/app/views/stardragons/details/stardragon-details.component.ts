import { Component, Input } from '@angular/core';

import { StarDragon } from './../stardragon';

import { GemExchangeAPI } from './../../../../services/api.service';

@Component({
  selector:    'stardragon-details',
  templateUrl: './stardragon-details.template.html',
  providers:   [GemExchangeAPI]
})
export class StarDragonDetailsComponent {
  title = 'StarDragon';

  @Input() id:string;
  public stardragon:StarDragon;

  constructor(private gem: GemExchangeAPI){}

  ngOnInit(){
    this.details();
    console.log("Stardragon id is "+this.id)
  }

  // Get a stardragon by ID
  details() {
    this.gem.api("/stardragon/details", "post", {id:this.id}).subscribe(
      data => {
        this.stardragon = data;
      },
      err  => {},
      ()   => {}
    );
  }
}
