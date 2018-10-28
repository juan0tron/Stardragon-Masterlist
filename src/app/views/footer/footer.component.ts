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

  links = [
    {
      "name":"Patreon",
      "class":"fab fa-patreon",
      "link":"https://www.patreon.com/GemExchange"
    },
    {
      "name": "Twitter",
      "class":"fab fa-twitter",
      "link":"https://twitter.com/Gem_Exchange"
    }
  ];

  constructor(){}

  ngOnInit(){}

}
