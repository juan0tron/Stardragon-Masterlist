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
    return this.api.api("/traits/descriptions", 'GET');
  }

  getSpeciesHeaders(){
    return this.http.get(`assets/data/species-headers.json`);
  }

  /**
   *  @function getSpeciesTypes
   *  @description Get a list of available Species types
   *  Returns array of species names
   */
  getSpeciesTypes(){
    return this.api.api("/traits", 'GET').map((traits) => {
      let types = traits.map(a => a.species);
      let uniqueTypes = types.filter(function(elem, index, self) {return index == self.indexOf(elem)});
      return uniqueTypes;
    });
  }

  /**
   *  @function getSpeciesTypes
   *  @description Get a list of available Subspecies for a given species
   *  Returns array of subspecies names
   */
  getSubspeciesTypes(species){
    return this.getTraits(species).map((traits) => {
      let subtypes = traits.map(a => {
        if(a.species === species && a.subtype != undefined)
          return a.subtype
      });
      let uniqueSubtypes = subtypes.filter(function(elem, index, self) {
        if(elem) return index == self.indexOf(elem)
      });
      return uniqueSubtypes;
    });
  }

  getAllTraits(){
    return this.api.api("/traits", 'GET');
  }

  getTraits(species, subspecies?){
    if(subspecies){
      return this.api.api(`/traits/${species}`, 'GET').map((traits) => {
        return traits.filter(trait => {
          if(trait.subtype == subspecies || trait.subtype == 'standard')
            return trait
        })
      });
    }
    else{
      if(species === "all")
        return this.getAllTraits();
      else
        return this.api.api(`/traits/${species}`, 'GET');
    }
  }

}
