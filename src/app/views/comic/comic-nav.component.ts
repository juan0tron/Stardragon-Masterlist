import { Component, Input }  from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ComicService } from './comic.service';

@Component({
  selector: 'comic-nav',
  templateUrl: './comic-nav.template.html',
  providers: []
})
export class ComicNavComponent {

  @Input() page:number;

  public baseUrl = "/comic";
  public pageCount = 3;
  public pageSelector = 1;
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
        }
      }
    );
  }

  goToPage(page){
    if(this.page != 0 && this.page <= this.pageCount){
      this.page = page;
      this.pageSelector = this.page;
      this.nextPage = +(this.page) + 1;
      this.prevPage = +(this.page) - 1;

      this.router.navigate([`/comic/page-${page}`]);
    }
  }
}
