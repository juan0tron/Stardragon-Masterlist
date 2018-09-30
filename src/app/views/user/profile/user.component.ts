// Angular
import { Component } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';

// 3rd Party
import { default as swal} from 'sweetalert2';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

// Components
import { InventoryComponent } from './../inventory/inventory.component';

// Models
import { User } from 'app/models/user'

@Component({
    selector:    'user',
    templateUrl: 'user.template.html',
    providers:   [GemExchangeAPI, User]
})

export class UserComponent {

  public user:User = new User;
  public isOwnProfile:boolean = false;

  public links = [ 'deviantart', 'twitter', 'tumblr', 'instagram' ];

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

  private router_sub: any;

  constructor(
    private api:    GemExchangeAPI,
    private route:  ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){
    this.router_sub = this.route.params.subscribe(params => {
      this.user._id = params['user_id'];
      this.details();
    });
  }

  /**
   *  @function details
   *  @description Retrieve the user object from the API
   */
  details(){
    this.api.api("/users/"+this.user._id, "GET", {}).subscribe(
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
      ()   => { this.checkIfOwnProfile(); }
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

  objectKeys(object){
    return Object.keys(object);
  }

  /**
   *  @function isOwnProfile
   *  @description Determine if this user page belongs to the currently logged in user
   */
  checkIfOwnProfile(){
    this.isOwnProfile = (localStorage.getItem("user_id") === this.user._id ? true : false);
  }

  modifyToken(amount){
    swal({
      html:``,
      title:"Give Token?",
      customClass:"animated fadeInDown",
      animation: false,
      showCancelButton: true,
      focusConfirm: false,
      input: 'select',
      inputOptions:{'common':"Common",'uncommon':"Uncommon",'rare':"Rare"},
      inputPlaceholder:'Select Type...',
      onClose: function(modal){
        modal.classList.add("fadeOutUp");
      }
    }).then((result) => {
      if(result.value){
        this.api.api(`/users/${this.user._id}/modifyToken`, "PATCH", {user_id:this.user._id, type:result.value, amount}).subscribe(
          data => {
            swal({
              title:`${result.value} Token Modified!`,
              html:`<img src="assets/img/tokens/${result.value}.png">`,
            });
          },
          err  => { swal("Error","Error gifting token. "+err.message, "error") },
          () => { this.details() }
        )
      }
    });
  }
}
