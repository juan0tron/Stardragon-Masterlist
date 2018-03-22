import { Component, Input }       from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GemExchangeAPI } from './../../../services/api.service';

@Component({
  selector:    'navigation',
  templateUrl: './navigation.template.html',
  providers:   []
})
export class NavigationComponent {

  public router_sub:any;

  constructor(
    private api:    GemExchangeAPI,
    private route:  ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){}

}
