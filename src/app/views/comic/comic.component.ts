import { Component }  from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ComicService } from './comic.service';

@Component({
  selector: 'comic',
  templateUrl: './comic.template.html',
  providers: [ComicService]
})
export class ComicComponent {

  public page:number;
  public lastPage:number;

  // public baseComicUrl = "http://static.thegemexchange.net/comic/";
  public baseComicUrl = "http://static.thegemexchange.net/comic/";
  public comicUrl:string;

  public isLastPage:boolean = false;

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
          this.comicService.getPageCount().subscribe(
            data => {
              this.lastPage = data;
              if(this.page == this.lastPage) this.isLastPage = true
            }
          );
          this.comicService.getPage(this.page).subscribe(
            data => {
              this.comicUrl = data.url
              this.page     = data.page
              if(this.page == this.lastPage) this.isLastPage = true
            },
            err  => { this.router.navigate([`/comic`]); }
          )
        }
        // Default to the latest page if no page is specified
        else{
          this.comicService.getLastPage().subscribe(
            data => {
              this.page     = data.page;
              this.comicUrl = data.url;
              this.isLastPage = true;
              this.router.navigate([`/comic/page-${this.page}`],  { replaceUrl: true });
            }
          )
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
      this.isLastPage = false;
      this.router.navigate([`/comic/page-${previousPage}`]);
    }
  }

  nextPage(){
    let nextPage = +(this.page) + 1;
    if(!this.isLastPage){
      this.router.navigate([`/comic/page-${nextPage}`]);
    }
  }
}
