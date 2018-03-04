import { Component, Input } from '@angular/core';

import { Stardragon } from './../../../models/stardragon';

import { GemExchangeAPI } from './../../../../services/api.service';

@Component({
  selector:    'stardragon',
  templateUrl: './stardragon.template.html',
  providers:   [GemExchangeAPI]
})
export class StardragonComponent {
  title = 'Stardragon';

  @Input() id:string;
  public stardragon:Stardragon;

  constructor(private gem: GemExchangeAPI){}

  ngOnInit(){
    this.details();
    console.log("Stardragon id is "+this.id)
  }

  // Get a stardragon by ID
  details() {
    this.gem.api("/stardragon/details", "POST", {id:this.id}).subscribe(
      data => {
        this.stardragon = data;
      },
      err  => {},
      ()   => {}
    );
  }
}
