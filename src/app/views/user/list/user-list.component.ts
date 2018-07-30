// Angular
import { Component } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

// Models
import { User } from 'app/models/user'

@Component({
    selector:    'user-list',
    templateUrl: 'user-list.template.html',
    providers:   [GemExchangeAPI, User]
})

export class UserListComponent {

  public users:Array<User>;

  private router_sub: any;

  constructor(
    private api:    GemExchangeAPI,
    private route:  ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){
    this.list();
  }

  /**
   *  @function list
   *  @description Retrieve a list of users
   */
  list(){
    this.api.api("/users", "GET").subscribe(
      data => { this.users = data },
      err  => { console.error("Error getting user data.", err)},
      ()   => { console.log("Got list of users.", this.users)}
    );
  }

}
