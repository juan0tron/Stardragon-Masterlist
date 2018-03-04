import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';

import { Stardragon }      from './../../../models/stardragon';
import { StardragonTrait } from './../../../models/stardragon-trait';

import { TraitsService } from './traits-service';

import { GemExchangeAPI } from './../../../../services/api.service';

@Component({
  selector:    'traits',
  templateUrl: './traits.template.html',
  providers:   [GemExchangeAPI, TraitsService]
})
export class TraitsComponent {

  public stardragon:Stardragon;
  public species:string;

  public base_img_directory = './assets/img/';
  public img_directory:string = '';
  public header_img:string = '';

  public traits:Array<StardragonTrait> = [];
  public trait_descriptions = [];

  public rarity_filter:string  = 'all';
  public type_filter:string    = 'all';
  public subtype_filter:string = 'all';

  public router_sub:any;

  public available_species = [
    'starshooter',
    'starweaver',
    'starfisher'
  ];

  constructor(
    private gem:           GemExchangeAPI,
    private traitsService: TraitsService,
    private route:         ActivatedRoute,
    private router:        Router
  ){}

  ngOnInit(){
    this.router_sub = this.route.params.subscribe(params => {
      let species = params['species_name'];
      // Change plural names to singular, IE "starshooters" to "starshooter"
      if (species.substring(species.length - 1) == "s"){
        species = species.substring(0, species.length-1);
      }
      // Get this species' traits if it exists
      if(this.available_species.includes(species)){
        this.species = species;
        this.getTraitsBySpecies(species)
      }
      // Redirect home if not a real species name
      else{
        this.router.navigate(['/home']);
      }
    });
  }

  /**
   *  @function getTraitsBySpecies
   *  @description Get a traits object for a specific species from the Traits service
   *  @param {string} species
   *  @TODO - Move this data to the API!
   */
  getTraitsBySpecies(species){
    this.traitsService.getTraits(species).subscribe(
      data => {
        console.error("STARFISHER DATA HERE", data);

        this.img_directory      = this.base_img_directory + data["img_directory"];
        this.header_img         = this.img_directory + data["header_img"];
        this.traits             = data["traits"];
        this.trait_descriptions = data["trait_descriptions"];
      },
      err  => {console.error("error getting traits for "+species, err)},
    );
  }

  /**
   *  @function filterTraits
   *  @description Filter the traits list by the following params:
   *  @param {string} type
   *  @param {string} rarity
   *  @param {string} species
   */
  filterTraits(type, rarity, subtype){
    return this.traits.filter(function(trait, index, self){
      if(
        (type    == trait.type    || this.type_filter    ==  trait.type || type == "all") &&
        (rarity  == trait.rarity  || this.rarity_filter  == "all") &&
        (subtype == trait.subtype || this.subtype_filter == "all")
      ){
        return true;
      }
    }.bind(this));
  }

  /**
   *  @function getSubspeciesTypes
   *  @description Get a list of available Subspecies Types from the traits object
   */
  getSubspeciesTypes(){
    let types = this.traits.map(a => a.subtype);
    let unique_types = types.filter(function(elem, index, self) {return index == self.indexOf(elem)});
    return unique_types;
  }

  /**
   *  @function getSubspeciesTypes
   *  @description Get a list of available Trait Types from the traits object
   */
  getTraitTypes(){
    let types = this.traits.map(a => a.type);
    let unique_types = types.filter(function(elem, index, self) {return index == self.indexOf(elem)});
    return unique_types;
  }

  /**
   *  @function getTraitDescription
   *  @description Get the description for the specified trait type
   */
  getTraitDescription(type, field){
    let desc_obj = this.trait_descriptions.find(function(trait, index, self){
      return trait.type == type;
    });
    if(desc_obj){
      return desc_obj[field];
    }
    else{
      return "";
    }
  }
}
