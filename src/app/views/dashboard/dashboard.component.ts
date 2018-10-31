// Angular
import { Component } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';

// 3rd Party
import { default as swal} from 'sweetalert2';

// Services
import { JwtHelperService } from '@auth0/angular-jwt';
import { GemExchangeAPI } from 'app/services/api.service';

// Models
import { User } from 'app/models/user'

@Component({
  selector:    'dashboard',
  templateUrl: './dashboard.template.html',
  providers: [GemExchangeAPI]
})
export class DashboardComponent {
  title = 'Dashboard';

  public user:User = new User;

  public rows = [1,2,4,5,6,7,8,9,10]

  public events = [];

  public tokens = [
    {
      name:  "common",
      type:  "slot",
      img:   "assets/img/icons/slot_common.png",
      count: 3
    },
    {
      name:  "uncommon",
      type:  "slot",
      img:   "assets/img/icons/slot_uncommon.png",
      count: 2
    },
    {
      name:  "rare",
      type:  "slot",
      img:   "assets/img/icons/slot_rare.png",
      count: 4
    }
  ];

  constructor(
    public api:       GemExchangeAPI,
    public jwtHelper: JwtHelperService
  ){}

  ngOnInit(){
    this.getUser();
    this.getEvents();
  }

  objectKeys(object){
    return Object.keys(object);
  }

  showTokenDetails(token){
    swal({
      // title: token.name,
      html:
        `<img src='${token.img}'>` +
        `<p><b>You have ${token.count} ${token.name} ${token.type}s available.</b></p>` +
        '<p>Quisque felis ligula, tempor a congue non, ornare eu elit. Mauris commodo sit amet nisl ac fermentum. Nulla facilisi. Morbi id justo purus. Pellentesque justo risus, dapibus quis tempus sit amet, euismod sit amet ipsum. Phasellus vitae velit nec urna hendrerit suscipit. Pellentesque ut tellus justo.</p>',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: `Create Stardragon (Costs 1 Slot)`,
    }).then(() => {
      // swal("ok!");
    })

  }

  getUser(){
    let userId = this.jwtHelper.decodeToken(localStorage.getItem("auth_token")).id;
    this.api.api(`/users/${userId}`, "GET", {}).subscribe(
      data => {
        this.user = data;
        // Get total count of items in inventory
        if(data.inventory){
          let inventoryCount = 0;
          let tokens = data.inventory.tokens;
          for (var token in tokens) {
          	if (tokens.hasOwnProperty(token)) {
          		inventoryCount += tokens[token];
          	}
          }
          this.user['inventoryCount'] = inventoryCount;
        }
      },
      err  => { },
      ()   => { return this.user }
    );
  }

  /**
   *  @function getEvents
   *  @description Get this user's event history
   */
  getEvents(){
    this.api.api('/auth/events', "GET").subscribe(
      data => {this.events = data.data},
      err  => {},
      ()   => {},
    );
  }

}
