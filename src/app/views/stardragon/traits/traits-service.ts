import {Injectable}     from '@angular/core';
import {
  Headers,
  Response,
  RequestOptions,
} from '@angular/http';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpParams,
} from '@angular/common/http';
import 'rxjs/Rx';

import { GemExchangeAPI } from 'app/services/api.service';

@Injectable()
export class TraitsService {

  public available_species = [
    'starcrafter',
    'starfisher',
    'stardasher',
    'starrobber',
    'stareater',
    'starsweeper',
    'starweaver',
    'starshooter',
  ];

  constructor(
    public http: HttpClient,
    public api:  GemExchangeAPI
  ) {}

  getTraitDescriptions(){
    return this.http.get(`assets/data/trait-descriptions.json`)
  }

  getSpeciesHeaders(){
    return this.http.get(`assets/data/species-headers.json`)
  }

  getLocalTraits(species){
    return this.http.get(`assets/data/${species}-traits.json`)
  }

  getTraits(species){
    return this.api.api(`/traits/${species}`, 'GET')
  }

  getAllTraits(){
    return this.api.api("/traits", 'GET');
  }
}
