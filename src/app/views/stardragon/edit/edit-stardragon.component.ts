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
  public stardragon:Stardragon = new Stardragon();
  public id;
  public confirmDeletion:string;

  // Forms
  public adminInfo;
  public bio = this.fb.group({
    image_url:[],
    gender:   [],
    bio:      []
  });
  public templateSettings;
  public designerInfo;
  public tradeSettings;

  // Dropdowns
  public speciesTypes = [
    'stareater',
    'starsweeper',
    'stardasher',
    'starfisher',
    'starweaver',
    'starrobber',
    'starcrafter',
    'starshooter',
    'chimera'
  ];
  public rarityTypes = [
    'common', 'uncommon', 'rare', 'legendary', 'chimera'
  ];
  public sexTypes = [
    'male', 'female', ''
  ]

  constructor(
    public  gem: GemExchangeAPI,
    private fb:  FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['stardragon_id']){
        this.id = params['stardragon_id'];
        this.getDetails(this.id);
      }
      this.adminInfo = this.fb.group({
        name:       [null, Validators.required],
        species:    [null, Validators.required],
        type:       [null, Validators.required],
        rarity:     [null, Validators.required],
        sex:        [null, Validators.required],
        base:       [''],
        basePrice:  [0, Validators.required],
        adminNotes: [''],
      });
      this.bio = this.fb.group({
        image_url:[],
        gender:   [],
        bio:      []
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
    this.gem.api(`/stardragons/${id}`, "GET").subscribe(
      data => {
        // Fix fields if the data is weird
        if(data.basePrice == null || !data.basePrice){
          data.basePrice = 0;
        }
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
    // Create a new SD
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
    // Update an existing SD
    else{
      this.gem.api(`/stardragons/${this.id}`, "PATCH", stardragon).subscribe(
        data => {
          swal("Changes Saved Successfully",data.message,"success");
          this.stardragon = data.data;
          this.router.navigate([`stardragons/${this.id}/edit`]);
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
      let extension = file.name.substr(file.name.lastIndexOf('.') + 1);
      reader.readAsDataURL(file);
      reader.onload = () => {
        file = {
          name: `avatar.${extension}`,
          type: file.type,
          value: reader.result.split(',')[1] // remove base64 header
        };
        this.gem.api('/file', "POST", { file, stardragonId:this.id }).subscribe(
          data => {
            this.bio.get('image_url').setValue(data.data);
            console.log(data, this.bio)
          },
          err  => {},
          ()   => {
            this.save(this.bio);
          }
        );
      };
    }



  }
}
