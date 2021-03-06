import {
  Component, Input,
  OnInit,
  OnChanges, SimpleChanges, SimpleChange
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ComicService } from './comic.service';

@Component({
  selector: 'comic-nav',
  templateUrl: './comic-nav.template.html',
  providers: []
})
export class ComicNavComponent {

  @Input() page:number;
  @Input() lastPage:number;
  @Input() isLastPage:boolean;

  public baseUrl = "/comic";
  public pageSelector:number;
  public nextPage = 0;
  public prevPage = 0;

  public router_sub:any;

  constructor(
    private route:  ActivatedRoute,
    private router: Router,
    private comicService: ComicService
  ){}

  ngOnInit(){
    this.router_sub = this.route.params.subscribe(
      params => {
        if(params['page']){
          this.page = params['page'].replace('page-','');
          this.pageSelector = this.page;
          this.nextPage = +(this.page) + 1;
          this.prevPage = +(this.page) - 1;
          if(this.page == this.lastPage) this.isLastPage = true;
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.isLastPage){
      this.isLastPage = changes.isLastPage.currentValue
    }
    if(changes.lastPage){
      this.lastPage = changes.lastPage.currentValue
    }
  }

  // Called when someone picks a page by number
  goToPage(page){
    this.router.navigate([`/comic/page-${page}`]);
  }
}
