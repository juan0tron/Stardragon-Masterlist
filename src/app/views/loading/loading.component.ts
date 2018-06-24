// Angular
import { Component, Input }       from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
  selector:    'loading',
  templateUrl: './loading.template.html',
  providers:   []
})
export class LoadingComponent {

  constructor(
    public  api:    GemExchangeAPI,
    private route:  ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){}

}
