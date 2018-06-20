// Angular
import { Component, Input }       from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
  selector:    'navigation',
  templateUrl: './navigation.template.html',
  providers:   []
})
export class NavigationComponent {

  public router_sub:any;
  public user_id:string;

  constructor(
    public  api:    GemExchangeAPI,
    private route:  ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.user_id = localStorage.getItem("user_id");
  }

}
