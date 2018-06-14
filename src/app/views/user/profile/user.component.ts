import { Component } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';

import { GemExchangeAPI } from './../../../../services/api.service';
import { User } from './../../../models/user'

@Component({
    selector:    'user',
    templateUrl: 'user.template.html',
    providers:   [GemExchangeAPI, User]
})

export class UserComponent {

  public user:User = new User;
  public isOwnProfile:boolean = false;

  public links = [ 'deviantart', 'twitter', 'tumblr', 'instagram' ];

  private router_sub: any;

  constructor(
    private api:    GemExchangeAPI,
    private route:  ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){
    this.router_sub = this.route.params.subscribe(params => {
      this.user.id = params['user_id'];
      this.details();
    });

  }

  /**
   *  @function details
   *  @description Retrieve the user object from the API
   */
  details(){
    this.api.api("/users/"+this.user.id, "GET", {}).subscribe(
      data => { this.user = data; this.checkIfOwnProfile(); },
      err  => { console.error("Error getting user data.", err)},
      ()   => { console.log("Got user data.", this.user)}
    );
  }

  /**
   *  @function save
   *  @description Save the user object via an API request
   */
  save(){
    this.api.api("/users/save", "PATCH", this.user).subscribe(
      data => { },
      err  => { },
      ()   => { }
    );
  }

  /**
   *  @function isOwnProfile
   *  @description Determine if this user page belongs to the currently logged in user
   */
  checkIfOwnProfile(){
    if(localStorage.getItem("user_id") != this.user.id){
      this.isOwnProfile = false;
    }
    this.isOwnProfile = true;
  }



}
