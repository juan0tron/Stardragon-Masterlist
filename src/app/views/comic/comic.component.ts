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
  public pageCount = 2;

  public baseComicUrl = "http://static.thegemexchange.net/comic/";
  public comicUrl:string;

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

          // Page doesn't exist, go to most recent page
          if(this.page > this.pageCount || this.page <= 0){
            this.page = this.pageCount;
            this.router.navigate([`/comic/page-${this.pageCount}`]);
          }
          this.comicUrl = this.baseComicUrl + `${this.page}.png`;
        }
        else{
          this.comicUrl = this.baseComicUrl + `1.png`;
        }
      }
    );
  }

  ngOnDestroy(){
    this.router_sub.unsubscribe();
  }

  getPage(){
    // this.http.get(this.baseComicUrl + `${this.page}.png`, {headers:headers});
  }
}
