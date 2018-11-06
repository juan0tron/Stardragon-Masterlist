// Angular
import { Component, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// 3rd Party
import * as moment from 'moment';

// Models
import { Stardragon } from 'app/models/stardragon';

// Services
import { AuthService } from 'app/services/auth.service';
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
  selector:    'stardragon',
  templateUrl: './stardragon.template.html',
  providers:   [AuthService, GemExchangeAPI]
})
export class StardragonComponent {
  title = 'Stardragon';

  @Input() id:string;
  public stardragon:Stardragon;

  constructor(
    private auth: AuthService,
    private api:  GemExchangeAPI,
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
    this.api.api(`/stardragons/${this.id}`, "GET").subscribe(
      data => { this.stardragon = data },
      err  => {},
      ()   => {}
    );
  }

  /**
   *  Copies a string value to the user's clipboard
   *  by creating an invisible text box and copying its contents
   */
  copyToClipboard(val: string){
    let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;

    document.body.appendChild(selBox);

    selBox.focus();
    selBox.select();

    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
