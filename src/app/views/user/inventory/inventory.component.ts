// Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';

// 3rd Party
import { default as swal} from 'sweetalert2';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

// Models
import { User } from 'app/models/user'

@Component({
    selector:    'inventory',
    templateUrl: 'inventory.template.html',
    providers:   [GemExchangeAPI, User]
})

export class InventoryComponent {

  public inventory:any = {};
  public inventoryCount:number = 0;

  constructor(){}

  getTotalCount(){
    this.inventoryCount = 0;
    for (var token in this.inventory.tokens) {
      if (this.inventory.tokens.hasOwnProperty(token)) {
        this.inventoryCount += this.inventory.tokens[token];
      }
    }
  }

}
