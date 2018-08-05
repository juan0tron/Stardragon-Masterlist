import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// 3rd Party
import { default as swal} from 'sweetalert2';

// Models
import { Stardragon }      from 'app/models/stardragon';
import { StardragonTrait } from 'app/models/stardragon-trait';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
  selector:    'stardragon-index',
  templateUrl: './stardragon-index.template.html',
  providers:   [GemExchangeAPI]
})

export class StardragonIndex {

  public speciesHeaders = [
    {
      "species": "starcrafter",
      "loading": true
    },
    {
      "species": "starfisher",
      "loading": true
    },
    {
      "species": "stareater",
      "loading": true
    },
    {
      "species": "starrobber",
      "loading": true
    },
    {
      "species": "stardasher",
      "loading": true
    },
    {
      "species": "starshooter",
      "loading": true
    },
    {
      "species": "starweaver",
      "loading": true
    },
    {
      "species": "starsweeper",
      "loading": true
    },
    {
      "species": "all",
      "loading": true
    },
  ];

  constructor(){}

  ngOnInit(){
  }
}
