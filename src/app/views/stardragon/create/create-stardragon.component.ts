import { Component } from '@angular/core';

import { Stardragon } from './../../../models/stardragon';

import { GemExchangeAPI } from './../../../../services/api.service';

@Component({
  selector:    'create-stardragon',
  templateUrl: './create-stardragon.template.html',
  providers: [GemExchangeAPI]
})
export class CreateStardragonComponent {

  title = 'Create a Stardragon';

  constructor(private gem: GemExchangeAPI){}

  ngOnInit(){
  }

}
