import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';

// 3rd Party
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

// Models
import { Stardragon }      from './../../../models/stardragon';
import { StardragonTrait } from './../../../models/stardragon-trait';

// Services
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

  public base_img_directory   = './assets/img/';
  public img_directory:string = '';
  public headers:any = {};

  public traits:Array<StardragonTrait> = [];
  public visibleTraits:Array<StardragonTrait> = [];
  public trait_descriptions = [];

  public search_filter:string  = '';
  public rarity_filter:string  = 'all';
  public type_filter:string    = 'all';
  public subtype_filter:string = 'all';
  public sex_filter:string     = 'all';

  public typeahead = [];

  public router_sub:any;

  public display_index:boolean   = false;
  public traits_index:Array<any> = [];

  public available_species = [
    'starcrafter',
    'stardasher',
    'stareater',
    'starfisher',
    'starrobber',
    'starshooter',
    'starsweeper',
    'starweaver',
  ];

  public sexes = [
    'all',
    'feminine',
    'masculine',
    'unisex',
  ]

  constructor(
    private gem:           GemExchangeAPI,
    private traitsService: TraitsService,
    private route:         ActivatedRoute,
    private router:        Router
  ){}

  ngOnInit(){
    this.router_sub = this.route.params.subscribe(
      params => {
        /* Display traits for a specific species */
        if(params['species_name']){
          let species = params['species_name'];
          // Change plural names to singular, IE "starshooters" to "starshooter"
          if (species.substring(species.length - 1) == "s"){
            species = species.substring(0, species.length-1);
          }
          // Get this species' traits if it exists
          if(this.available_species.includes(species)){
            this.species = species;
            this.getTraitsBySpecies(species);
          }
          // Otherwise, route to traits index
          else{
            this.router.navigate(['/stardragons/traits']);
          }
        }
        /* Display a list of all species with traits pages */
        else{
          this.display_index = true;

          for(let s of this.available_species){
            this.traitsService.getTraits(s).subscribe(
              data => {
                let trait = {
                  name:s+"s",
                  link:"/stardragons/traits/"+s,
                  img: "/assets/img/" + data['img_directory'] + data['headers']['standard']
                };
                this.traits_index.push(trait);
              }
            );
          }
        }
      }
    );
  }

  ngOnDestroy(){
    this.router_sub.unsubscribe();
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
        this.img_directory      = this.base_img_directory + data["img_directory"];
        this.headers            = data['headers'];
        this.traits             = data['traits'];
        this.visibleTraits      = this.traits;
        this.trait_descriptions = data['trait_descriptions'];
        this.typeahead          = this.getTypeaheadList("name");
      },
      err  => {console.error("error getting traits for "+species, err)},
    );
  }

  /**
   *  @function filterTraitsByType
   *  @description Filter the traits list by type
   *  @param {string} type
   *  @return {object} traits - the filtered traits list
   */
  filterTraitsByType(type){
    return this.visibleTraits.filter(function(trait, index, self){
      if(
        (this.search_filter == trait.name || this.search_filter  == "")    &&
        (type == trait.type || type == "all") &&
        (this.rarity_filter == trait.rarity  || this.rarity_filter  == "all") &&
        (this.subtype_filter == trait.subtype || this.subtype_filter == "all") &&
        (this.sex_filter == trait.sex || (this.sex_filter == "unisex" && !trait.sex)||this.sex_filter == "all")
      ){
        return true;
      }
    }.bind(this));
  }

  /**
   *  @function filterVisibleTraits
   *  @description Filter the visible traits list by checking the status of all filter vars
   */
  filterVisibleTraits(){
    this.visibleTraits = this.traits.filter(function(trait, index, self){
      if(
        (this.search_filter  == trait.name    || this.search_filter  == "")    &&
        (this.type_filter    == trait.type    || this.type_filter    == "all") &&
        (this.rarity_filter  == trait.rarity  || this.rarity_filter  == "all") &&
        (this.subtype_filter == trait.subtype || this.subtype_filter == "all") &&
        (this.sex_filter     == trait.sex     || this.sex_filter     == "all" || (this.sex_filter == "unisex" && !trait.sex))
      ){
        return true;
      }
    }.bind(this));
    this.typeahead = this.getTypeaheadList("name");
  }

  /**
   *  @function clearAllFilters
   *  @description Reset all trait filters
   */
  clearAllFilters(){
    this.search_filter  = '';
    this.rarity_filter  = 'all';
    this.type_filter    = 'all';
    this.subtype_filter = 'all';
    this.sex_filter     = 'all';
    this.filterVisibleTraits();
  }

  /**
   *  @function    getTypeaheadList
   *  @description Gets a list of traits for typeahead search. Shows only a list of visible traits.
   *  @param  {string} property - The property of the trait to filter
   *  @return {array}           - A unique array of property strings
   */
  getTypeaheadList(property): Array<any> {
    let list = this.visibleTraits.map(function (obj) { return obj[property] })
    return list.filter(function (elem, index, self) { return index === self.indexOf(elem) })
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
