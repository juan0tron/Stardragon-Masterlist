// Angular
import { Component, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// 3rd Party
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';

// Animations
import { slideInOut, fadeBackground } from 'app/animations/nav.animations';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
  selector:    'navigation',
  templateUrl: './navigation.template.html',
  animations:  [slideInOut, fadeBackground],
  providers:   []
})
export class NavigationComponent {

  @ViewChild('loginComponent') private loginComponent: SwalComponent;

  public router_sub:any;
  public user_id:string;
  public user:any = {};

  public isScrolledToTop:boolean = true;
  public sideNavState:string = "hide";

  public socialLinks = [
    {
      "name":"Patreon",
      "class":"fab fa-patreon",
      "link":"https://www.patreon.com/GemExchange"
    },
    {
      "name":"Toyhouse",
      "class":"fa fa-home",
      "link":"http://toyhou.se/~world/1420.gemexchange-jo-arca"
    },
    {
      "name":"Fur Affinity",
      "class":"fa fa-paw",
      "link":"https://www.furaffinity.net/user/gemexchange"
    },
    {
      "name": "Twitter",
      "class":"fab fa-twitter",
      "link":"https://twitter.com/Gem_Exchange"
    },
    {
      "name":"Github",
      "class":"fab fa-github",
      "link":"https://github.com/juan0tron/the-gem-exchange"
    },
    {
      "name":"DeviantArt",
      "class":"fab fa-deviantart",
      "link":"https://gemexchange.deviantart.com/"
    },
    {
      "name":"Discord",
      "class":"fab fa-discord",
      "link":"https://discord.gg/T9Xrjs5"
    }
  ];

  constructor(
    public  api:    GemExchangeAPI,
    private route:  ActivatedRoute,
    private router: Router,
    public  el:     ElementRef,
    public jwtHelper: JwtHelperService
  ){}

  ngOnInit(){
    this.user_id = localStorage.getItem("user_id");
    this.getUserData();
    this.router.events.subscribe(
      data => {
        if(data['url'] === '/login'){
          this.loginComponent.show();
        }
        else{
          this.closeSideNav();
        }
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset
    if (scrollPosition <= 100) {
      this.isScrolledToTop = true;
    }
    else{
      this.isScrolledToTop = false;
    }

  }

  // Used instead of routerLink so we can close the side nav when clicked
  changeRoute(route){
    this.closeSideNav();
    this.router.navigate([route]);
  }

  getUserData(){
    let jwt = this.jwtHelper.decodeToken(localStorage.getItem("auth_token"));
    this.user = jwt.user;
  }

  showLoginForm(){
    this.sideNavState = 'hide';
    this.loginComponent.show();
  }

  toggleSideNav(){
    if(this.sideNavState == "hide" || this.sideNavState == "hidden"){
      this.sideNavState = "show";
    }
    else if(this.sideNavState == "show"){
      this.sideNavState = "hide";
    }
  }

  closeSideNav(){
    if(this.sideNavState == 'show'){
      this.sideNavState = 'hide';
    }
  }
}
