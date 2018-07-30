// Angular
import { Component } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';

// 3rd Party
import { default as swal} from 'sweetalert2';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

// Models
import { User } from 'app/models/user'

@Component({
  selector:    'dashboard',
  templateUrl: './dashboard.template.html',
})
export class DashboardComponent {
  title = 'Dashboard';

  public user:User = new User;

  public rows = [1,2,4,5,6,7,8,9,10]

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

}
