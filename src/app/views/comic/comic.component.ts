import { Component }  from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ComicService } from './comic.service';

@Component({
  selector: 'comic',
  templateUrl: './comic.template.html',
  providers: [ComicService]
})
export class ComicComponent {

  public page:number = 1;
  public pageCount:number = 7;

  public baseComicUrl = "http://static.thegemexchange.net/comic/";
  public comicUrl:string;

  public loadingPage:boolean = true;

  public router_sub:any;

  constructor(
    private route:  ActivatedRoute,
    private router: Router,
    private comicService: ComicService
  ){}

  ngOnInit(){
    this.router_sub = this.route.params.subscribe(
      params => {
        this.loadingPage = true;
        if(params['page']){
          this.page = params['page'].replace('page-','');

          // Given page number doesn't exist, go to most recent page instead
          if(this.page > this.pageCount || this.page <= 0){
            this.page = this.pageCount;
            this.router.navigate([`/comic/page-${this.pageCount}`]);
          }
          this.comicUrl = this.baseComicUrl + `${this.page}.png`;
        }
        // Default to the latest page if no page is specified
        else{
          this.router.navigate([`/comic/page-${this.pageCount}`]);
        }
      }
    );

    document.onkeydown = function(event) {
      switch (event.key) {
        case "ArrowLeft":
          this.previousPage();
          break;
        case "ArrowRight":
          this.nextPage();
          break;
      }
    }.bind(this);
  }

  ngOnDestroy(){
    this.router_sub.unsubscribe();
  }

  previousPage(){
    let previousPage = +(this.page) - 1;
    if(previousPage != 0){
      this.router.navigate([`/comic/page-${previousPage}`]);
    }
  }

  nextPage(){
    let nextPage = +(this.page) + 1;
    if(nextPage <= this.pageCount){
      this.router.navigate([`/comic/page-${nextPage}`]);
    }
  }
}
