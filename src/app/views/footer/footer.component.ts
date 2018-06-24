// Angular
import { Component, Input }       from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
  selector:    'footer',
  templateUrl: './footer.template.html',
  providers:   []
})
export class FooterComponent {

  constructor(){}

  ngOnInit(){}

}
