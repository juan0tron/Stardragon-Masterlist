// Angular
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

// 3rd Party
import { default as swal} from 'sweetalert2';
import * as moment from 'moment';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

// Models
import { Stardragon } from 'app/models/stardragon';

@Component({
  selector:    'edit-stardragon',
  templateUrl: './edit-stardragon.template.html',
  providers: [GemExchangeAPI]
})
export class EditStardragonComponent {

  public title = 'Edit Stardragon';
  public stardragon:Stardragon;
  public id;
  public confirmDeletion:string;

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
    public  gem: GemExchangeAPI,
    private fb:  FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    this.activatedRoute.params.subscribe((params: Params) => {
      let stardragon;

      if(params['stardragon_id']){
        this.id = params['stardragon_id'];
        stardragon = this.getDetails(this.id);
      }
      stardragon = new Stardragon();

      this.adminInfo = this.fb.group({
        name:       [null, Validators.required],
        species:    [null, Validators.required],
        type:       [null, Validators.required],
        rarity:     [null, Validators.required],
        sex:        [null, Validators.required],
        base:       [''],
        basePrice:  [0, Validators.required],
        created:    [stardragon.created],
        approved:   [stardragon.approved],
        adminNotes: [''],
      });
      this.bio = this.fb.group({
        avatar: [],
        gender: [],
        bio:    []
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
    });
  }

  ngOnInit(){}

  /**
  * @function    getDetails
  * @description Update stardragon with info from the server
  */
  getDetails(id){
    return this.gem.api(`/stardragons/${id}`, "GET").subscribe(
      data => {
        // Update local Stardragon
        this.stardragon = data

        // Update all forms
        this.adminInfo.patchValue(data);
        this.bio.patchValue(data);
      },
      err => swal("Error getting Stardragon info.", err, "error")
    );
  }

  /**
   * @function save
   */
  save(formData){
    const stardragon = formData.value;
    if(!this.id){
      this.gem.api(`/stardragons`, "POST", stardragon).subscribe(
        data => {
          this.router.navigate(['/stardragons',data.stardragon._id]);
          swal("Stardragon Created Successfully",data.message,"success")
        },
        err  => {swal("Error Saving Changes.", err, "error")},
        ()   => {}
      );
    }
    else{
      this.gem.api(`/stardragons/${this.id}`, "PATCH", stardragon).subscribe(
        data => {
          swal("Changes Saved Successfully",data.message,"success");
          this.router.navigate(['/stardragons',data.stardragon._id,'/edit']);
        },
        err  => {swal("Error Saving Changes.", err, "error")},
        ()   => {}
      );
    }
  }

  /**
   * @function delete
   */
  delete(){
    swal({
      title: `Are you sure you want to delete ${this.stardragon.name}?`,
      text: "You won't be able to undo this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes! Delete them!`
    }).then((result) => {
      if (result.value) {
        this.gem.api(`/stardragons/${this.id}`, "DELETE").subscribe(
          data => {
            swal("Success",data.message,"success")
            this.router.navigate(['/stardragons']);
          },
          err  => { swal("Error deleting Stardragon.", err, "error") },
          ()   => {}
        );
      }
    })
  }

  /**
   * @function uploadImage
   */
  uploadImage(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.bio.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
        this.gem.api('/file', "POST", {file}).subscribe(
          data => {},
          err  => {},
          ()   => {}
        );
      };
    }



  }
}
