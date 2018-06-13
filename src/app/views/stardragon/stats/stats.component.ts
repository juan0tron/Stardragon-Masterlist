// Angular
import { Component, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

// Models
import { Stardragon } from './../../../models/stardragon';

// Services
import { GemExchangeAPI } from './../../../../services/api.service';

@Component({
  selector:    'stardragon-stats',
  templateUrl: './stats.template.html',
  providers:   [GemExchangeAPI]
})
export class StatsComponent {

  public objectKeys = Object.keys;

  public categories = {
    'eyesight':['dasher','crafter','weaver','shooter'],
    'hearing':['dasher','crafter','fisher'],
    'speed':['dasher','shooter','fisher'],
    'population':['eater','fisher','dasher', 'sweeper', 'shooter', 'crafter', 'weaver', 'robber'],
  };

  // Ordered by population
  public species = [
    'eater',
    'fisher',
    'dasher',
    'sweeper',
    'crafter',
    'weaver',
    'shooter',
    'robber',
  ];

  constructor(){}

}
