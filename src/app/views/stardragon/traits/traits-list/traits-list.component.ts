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

@Component({
  selector:    'traits-list',
  templateUrl: './traits-list.template.html',
  animations:  [listAnimation, fadeAnimation, shrinkExpand],
  providers:   [TraitsService]
})

export class TraitsListComponent {

}
