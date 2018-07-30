// Angular
import { Component, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// 3rd Party
import * as moment from 'moment';

// Models
import { Stardragon } from 'app/models/stardragon';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
  selector:    'stardragon',
  templateUrl: './stardragon.template.html',
  providers:   [GemExchangeAPI]
})
export class StardragonComponent {
  title = 'Stardragon';

  @Input() id:string;
  public stardragon:Stardragon;

  constructor(
    private gem: GemExchangeAPI,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['stardragon_id'];
      this.details();
    });
  }

  // Get a stardragon by ID
  details() {
    this.gem.api(`/stardragons/${this.id}`, "GET").subscribe(
      data => { this.stardragon = data },
      err  => {},
      ()   => {}
    );
  }
}
