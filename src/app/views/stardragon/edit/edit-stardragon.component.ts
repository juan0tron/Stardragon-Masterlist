import { Component } from '@angular/core';

import { Stardragon } from './../../../models/stardragon';

import { GemExchangeAPI } from './../../../../services/api.service';

@Component({
  selector:    'edit-stardragon',
  templateUrl: './edit-stardragon.template.html',
  providers: [GemExchangeAPI]
})
export class EditStardragonComponent {

  title = 'Edit Stardragon';

  constructor(private gem: GemExchangeAPI){}

  ngOnInit(){
  }

}
