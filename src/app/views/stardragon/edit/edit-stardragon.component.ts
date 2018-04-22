// Angular
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// 3rd Party
import { default as swal} from 'sweetalert2';

import { Stardragon } from './../../../models/stardragon';

import { GemExchangeAPI } from './../../../../services/api.service';

@Component({
  selector:    'edit-stardragon',
  templateUrl: './edit-stardragon.template.html',
  providers: [GemExchangeAPI]
})
export class EditStardragonComponent {

  public title = 'Edit Stardragon';
  public stardragon:Stardragon;

  // Forms
  public adminInfo;
  public bio;
  public templateSettings;
  public designerInfo;
  public tradeSettings;

  // Dropdowns
  public speciesTypes = [
    'StarEater',
    'StarSweeper',
    'StarDasher',
    'StarFisher',
    'StarWeaver',
    'StarRobber',
    'StarCrafter',
    'StarShooter'
  ];
  public rarityTypes = [
    'common', 'uncommon', 'rare', 'legendary'
  ];
  public sdTypes = [
    'myo', 'batch', 'auction'
  ]
  public sexTypes = [
    'male', 'female', 'n/a'
  ]

  constructor(
    private gem: GemExchangeAPI,
    private fb:  FormBuilder
  ){
    let stardragon = this.getDetails("5adbd4fe4f8a2146bc2ae0b8");

    this.adminInfo = this.fb.group({
      species:    [null, Validators.required],
      type:       [null, Validators.required],
      rarity:     [null, Validators.required],
      sex:        [null, Validators.required],
      base:       [''],
      basePrice:  ['', Validators.required],
      created:    [stardragon.created  || new Date()],
      approved:   [stardragon.approved || new Date()],
      adminNotes: [''],
    });
    this.bio = this.fb.group({
      avatar:[],
      name:[],
      gender:[],
      bio:[]
    });
    this.templateSettings = this.fb.group({
      templateType:[],
    });
    this.designerInfo = this.fb.group({
      designerName:[],
      designerLink:[],
      designerAccountType:[]
    });
    this.tradeSettings = this.fb.group({
      salePrice:[],
    });
  }

  ngOnInit(){}

  /**
  * @function    getDetails
  * @description Update stardragon with info from the server
  */
  getDetails(id){
    return this.gem.api("/stardragons/"+id, "GET").subscribe(
      data => {
        // Update local Stardragon
        this.stardragon = data

        // Update all forms
        this.adminInfo.patchValue(data)
      },
      err => swal("Error getting Stardragon info.", err, "error")
    );
  }

  /**
   * @function save
   */
  save(formData){
    const stardragon = formData.value;
    console.log("saving...")
    this.gem.api("/stardragons/5adbd4fe4f8a2146bc2ae0b8", "PATCH", stardragon).subscribe(
      data => {},
      err  => {swal("Error Saving Changes.", err, "error")},
      ()   => {}
    );
  }

}
