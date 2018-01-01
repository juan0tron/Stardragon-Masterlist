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
    'starweaver'
  ];

  constructor(
    private gem: GemExchangeAPI,
    private traitsService: TraitsService,
    private route:  ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.router_sub = this.route.params.subscribe(params => {
      let species = params['species_name'];
      // IE change "starshooters" to "starshooter"
      if (species.substring(species.length - 1) == "s"){
        species = species.substring(0, species.length-1);
      }
      // Redirect home if not a real species name
      if(this.available_species.includes(species)){
        this.getTraitsBySpecies(species)
      }
      else{
        this.router.navigate(['/home']);
      }
    });
  }

  getTraitsBySpecies(species){
    this.traitsService.getTraits(species).subscribe(
      data => {
        this.img_directory      = this.base_img_directory + data["img_directory"];
        this.header_img         = this.img_directory + data["header_img"];
        this.traits             = data["traits"];
        this.trait_descriptions = data["trait_descriptions"];
      },
      err  => {console.error("error getting traits for "+species, err)},
    );
  }

  getTraits(type, rarity, subtype){
    let traits = this.getTraitsByTypeAndRarity(type, rarity);
    return traits.filter(function(trait, index, self){
      if(subtype == 'all'){
        return true;
      }
      return trait.subtype == subtype;
    });
  }

  getTraitTypes(){
    let types = this.traits.map(a => a.type);
    let unique_types = types.filter(function(elem, index, self) {return index == self.indexOf(elem)});
    unique_types.push('all');
    return unique_types;
  }

  getTraitsByType(type){
    return this.traits.filter(function(trait, index, self){
      return trait.type == type;
    });
  }

  getTraitsByTypeAndRarity(type, rarity){
    let traits_by_type = this.getTraitsByType(type);
    if(this.rarity_filter == 'all'){
      return traits_by_type;
    }
    else{
      return traits_by_type.filter(function(trait, index, self){
        return trait.rarity == rarity;
      })
    }
  }

  getTraitDescription(type){
    let desc_obj = this.trait_descriptions.find(function(trait, index, self){
      return trait.type == type;
    });
    if(desc_obj){
      return desc_obj.description;
    }
    else{
      return "";
    }
  }
}
