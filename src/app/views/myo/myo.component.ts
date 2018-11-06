import { Component }  from '@angular/core';

import { GemExchangeAPI } from 'app/services/api.service';
import { TraitsService }  from 'app/services/traits.service';

@Component({
  selector: 'myo',
  templateUrl: './myo.template.html',
  providers: [GemExchangeAPI, TraitsService]
})
export class MYOComponent {

  title = 'Make Your Own Stardragon!';

  public showTraitPicker:boolean = false;

  public speciesTypes:Array<string>;
  public subspeciesTypes:Array<string>;

  public availableTraits:Array<any>;
  public availableTraitTypes:Array<string>;

  public selectedTraitType:string = null;
  public selectedTrait:any = null;

  public myo:any = {
    name:null,
    species:null,
    subspecies:null,
    traits:[]
  };

  constructor(
    public api:GemExchangeAPI,
    public traits:TraitsService
  ){}

  ngOnInit(){
    this.traits.getSpeciesTypes().subscribe(
      data => { this.speciesTypes = data; }
    )
  }

  addTrait(){
    this.myo.traits.push(this.selectedTrait);
    this.showTraitPicker = false;
    this.selectedTrait, this.selectedTraitType = null;
  }

  getSubspeciesTypes(species){
    this.traits.getSubspeciesTypes(species).subscribe(
      data => { this.subspeciesTypes = data }
    )
  }

  getTraits(species,subspecies){
    this.traits.getTraits(species, subspecies).subscribe(
      data => {
        this.availableTraits = data;
        let traitTypes = data.map(trait => trait.type);
        this.availableTraitTypes = traitTypes.filter(function(elem, index, self) {
          if(elem) return index == self.indexOf(elem)
        });
      }
    )
  }

  filterAvailableTraits(species, subspecies, traitType){
    this.traits.getTraits(species, subspecies).subscribe(
      data => {
        this.availableTraits = data.filter(trait => {
          console.log(trait)
          return trait.type === traitType
        })
      }
    )
  }

  submit(){

  }
}
