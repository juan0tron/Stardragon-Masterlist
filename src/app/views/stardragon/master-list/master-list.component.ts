import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Models
import { Stardragon }      from 'app/models/stardragon';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
  selector:    'master-list',
  templateUrl: './master-list.template.html',
  providers:   [GemExchangeAPI]
})

export class MasterList {

}
