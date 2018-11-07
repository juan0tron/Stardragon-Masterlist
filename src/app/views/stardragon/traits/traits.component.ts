import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// 3rd Party
import { default as swal} from 'sweetalert2';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

// animations
import { listAnimation, fadeAnimation, shrinkExpand }   from 'app/animations/traits.animations';

// Models
import { Stardragon }      from 'app/models/stardragon';
import { StardragonTrait } from 'app/models/stardragon-trait';

// Services
import { TraitsService }  from 'app/services/traits.service';
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
  selector:    'traits',
  templateUrl: './traits.template.html',
  animations:  [listAnimation, fadeAnimation, shrinkExpand],
  providers:   [GemExchangeAPI, TraitsService]
})

export class TraitsComponent {

  public loading = true;

  public showFilters:boolean = false;
  public filters = {
    species: 'all',
    name:    '',
    rarity:  'all',
    type:    'all',
    subtype: 'all',
    sex:     'all'
  };

  public base_img_directory   = 'http://static.thegemexchange.net/traits/';
  public img_directory:string = '';
  public headers:any = {};
  public header_img:string = 'http://static.thegemexchange.net/headers/all/header-standard.png';

  public traits:Array<StardragonTrait> = [];
  public visibleTraits:Array<StardragonTrait> = [];
  public trait_descriptions = [];

  public showFancyHeader:boolean = true;
  public headerImgDir = 'http://static.thegemexchange.net/headers/';
  public header = {
    background: this.headerImgDir + "background.png",
    characters: this.headerImgDir + "characters.png",
  };


  public typeahead = [];

  public router_sub:any;

  public traits_index:Array<any> = [];

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

  public sexes = [
    'all',
    'feminine',
    'masculine',
    'unisex',
  ]

  public rarities = [
    'all',
    'none',
    'common',
    'uncommon',
    'rare',
    'legendary'
  ]

  constructor(
    private gem:           GemExchangeAPI,
    private traitsService: TraitsService,
    private route:         ActivatedRoute,
    private router:        Router,
    private titleService:  Title
  ){}

  ngOnInit(){
    this.router_sub = this.route.params.subscribe(
      params => {
        /* Display traits for a specific species */
        if(params['species_name'] && params['subtype']){
          this.initTraitsPage(params['species_name'], params['subtype']);
        }
        else if(params['species_name']){
          this.initTraitsPage(params['species_name'])
        }
        else{
          this.initTraitsPage('all');
        }
      }
    );
  }

  ngOnDestroy(){
    this.router_sub.unsubscribe();
  }

  initTraitsPage(species, subtype = "all"){
    // Change plural names to singular, IE "starshooters" to "starshooter"
    if (species.substring(species.length - 1) == "s"){
      species = species.substring(0, species.length-1);
    }
    // Route to index if species does not exist
    if(!this.available_species.includes(species) && species != 'all'){
      this.router.navigate(['/stardragons']);
    }
    else{
      this.filters.species = species;
      this.filters.subtype = subtype;

      // Make API calls & get local data
      this.getTraitDescriptions();
      this.getHeaderImages();
      this.getTraits();
    }
  }

  getTraitDescriptions(){
    this.traitsService.getTraitDescriptions().subscribe(
      data => { this.trait_descriptions = data }
    );
  }

  getHeaderImages(){
    this.traitsService.getSpeciesHeaders().subscribe(
      data => { this.headers = data }
    );
  }

  /**
   *  @function getAllTraits
   *  @description Get all traits from all stardragons
   */
  getTraits(filtersToClear = []){
    let filterTypes = Object.keys(this.filters); // Get all filter types
    for(let filterToClear of filtersToClear){
      if(filterTypes.indexOf(filterToClear)){
        this.filters[filterToClear] = 'all';
      }
    }
    let filters = {

    }
    this.traitsService.getTraits(this.filters.species).subscribe(
      data => {
        for(let trait of data){
          trait.loading = true;
        }
        this.traits = data
      },
      err  => {
        this.loading = false;
        console.error("error getting traits", err)
      },
      ()   => {
        this.loading = false;
        this.filterTraits();
      }
    );
  }

  getAllTraits(){
    this.traitsService.getAllTraits().subscribe(
      data => {
        for(let trait of data){
          trait.loading = true;
        }
        this.traits = data;
      },
      err  => {
        this.loading = false;
        console.error("error getting traits", err)
      },
      ()   => {
        this.loading = false;
        if(this.traits.length > 0){
          this.filterTraits();
        }
      }
    );
  }

  /**
   *  @function filterTraits
   *  @description Filter the visible traits list by checking the status of all filter vars
   *  @param {string} filter - type, sex, etc
   *  @param {string} value - stardasher, "trait name", etc
   */
  filterTraits(){
    let filterTypes = Object.keys(this.filters); // Get all filter types
    let filteredTraits = this.traits.filter(trait => {
      return filterTypes.every(filterType => {

        let traitValue    = trait[filterType];
        let filteredValue = this.filters[filterType];

        let matchesExactly   = traitValue === filteredValue;
        let matchesAll       = filteredValue == 'all' || filteredValue == ''

        if(matchesExactly || matchesAll) return true;
      });
    });

    let subTypeTitle = this.filters.subtype.replace(/^\w/, c => c.toUpperCase());
    let speciesTitle = this.filters.species.replace(/^\w/, c => c.toUpperCase());
    let pageTitle = (this.filters.subtype == 'all' || this.filters.subtype == 'standard' ? '' : subTypeTitle) + ' ' +
                    (this.filters.species == 'all' ? '' : speciesTitle +'s: ')  +
                    "Stardragon Traits Compendium";
    this.titleService.setTitle(pageTitle);

    this.visibleTraits = filteredTraits;
    this.changeHeader();
    this.typeahead = this.getTypeaheadList("name");
    window.history.replaceState({}, '',`/stardragons/traits/${this.filters.species}/${this.filters.subtype}`);
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
        (this.filters.name == trait.name || this.filters.name  == "")    &&
        (type == trait.type || type == "all") &&
        (this.filters.rarity  == trait.rarity  || this.filters.rarity  == "all") &&
        (this.filters.subtype == trait.subtype || this.filters.subtype == "all") &&
        (this.filters.sex == trait.sex || (this.filters.sex == "unisex" && !trait.sex)||this.filters.sex == "all")
      ){
        return true;
      }
    }.bind(this));
  }

  /**
   *  @function clearAllFilters
   *  @description Reset all trait filters
   */
  clearAllFilters(){
    // If we're currently only displaying traits for one species,
    // fetch the list of all traits before filtering to "all"
    if(this.getSpeciesTypes().length <= 1){
      this.getAllTraits();
    }
    this.filters = {
      species: 'all',
      name:    '',
      rarity:  'all',
      type:    'all',
      subtype: 'all',
      sex:     'all',
    };
    this.filterTraits();
  }

  changeHeader(){
    if(this.filters.species != 'all'){
      let headerObj = this.headers[this.filters.species];
      let headerType = headerObj[this.filters.subtype] || headerObj['standard'];
      if(headerType === "old"){
        let fileName = 'header-standard.png';
        this.showFancyHeader = false;
        if(headerObj[this.filters.subtype] !== undefined)
          fileName = `header-${this.filters.subtype == 'all' ? "standard" : this.filters.subtype}.png`
        this.header_img = this.headerImgDir + `${this.filters.species}/${fileName}`;
      }
      else if(headerType === "new"){
        let basePath = this.headerImgDir + this.filters.species + '/' + this.filters.subtype;
        this.showFancyHeader = true;
        this.header = {
          background: `${basePath}/background.png`,
          characters: `${basePath}/characters.png`,
        };
      }
    }
    else{
      this.showFancyHeader = false;
      this.header_img = this.headerImgDir + `${this.filters.species}/header-standard.png`;
    }
  }

  // Lazy load animation helpers
  showHeaderBackground(){
    document.getElementById('species-header-background').style.backgroundImage = 'url(' + this.header.background + ')';
    document.getElementById('species-header-background').style.animation = 'fadeIn 1s';
  }
  showHeaderCharacters(){
    document.getElementById('header-characters').style.visibility = 'visible';
    document.getElementById('header-characters').style.animation = 'fadeIn 1s';
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
   *  @function getSpeciesTypes
   *  @description Get a list of available Species types from the traits object
   */
  getSpeciesTypes(){
    let types = this.traits.map(a => a.species);
    let unique_types = types.filter(function(elem, index, self) {return index == self.indexOf(elem)});
    return unique_types;
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
  getSubtypes(){
    return this.getSubspeciesTypes();
  }

  /**
   *  @function getTraitTypes
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

  getTraitTypeDescription(type, species){
    let desc_obj = this.trait_descriptions.find(function(trait, index, self){
      return trait.type == type;
    });
    if(desc_obj && desc_obj['description']){
      return desc_obj['description'][species];
    }
    return "";
  }

  // Show a modal with all information about the selected trait
  showTraitDetails(trait){
    let faGender = "fa-transgender";
    switch(trait.sex){
      case "feminine":
        faGender = "fa-venus";
      case "masculine":
        faGender = "fa-mars";
      case "unisex":
      default:
        faGender = "fa-transgender";
    }

    let src = this.base_img_directory + trait.species+'/' + trait.image;
    swal({
      html:`
        <img  class="trait-img" src="${src}" >
        <h2 class="swal2-title" id="swal2-title">
          <span class="trait-rarity"><i class="fa fa-circle rarity ${trait.rarity}" title="${trait.rarity}"></i></span>
           ${trait.name}
          <span class="trait-sex"><i class="fa ${faGender}"></i></span>
        </h2>
        <p class="trait-meta">${trait.sex || 'Unisex'} ${trait.species} ${trait.type} (${trait.subtype} Subtype)</p>
      `,
      customClass:"swal2-trait "+trait.rarity+" animated fadeInDown",
      animation: false,
      // showCancelButton: true,
      focusConfirm: false,
      // confirmButtonText: 'Add to wishlist...',
      // cancelButtonText: 'Close',
      onClose: function(modal){
        modal.classList.add("fadeOutUp");
      }
    }).then((result) => {
      if(result.value){
        // swal("Added to wishlist!");
      }
    });
  }
}
