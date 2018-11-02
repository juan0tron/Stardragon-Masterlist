// Angular
import { Component, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// 3rd Party
import { SwalComponent }    from '@toverux/ngx-sweetalert2';

// Animations
import { slideInOut, fadeBackground } from 'app/animations/nav.animations';

// Services
import { AuthService }    from 'app/services/auth.service';
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
  selector:    'navigation',
  templateUrl: './navigation.template.html',
  animations:  [slideInOut, fadeBackground],
  providers:   [AuthService, GemExchangeAPI]
})
export class NavigationComponent {

  @ViewChild('loginComponent') private loginComponent: SwalComponent;

  public router_sub:any;
  public user_id:string;
  public user:any;

  public isScrolledToTop:boolean = true;
  public sideNavState:string = 'hide';

  public hideNav:boolean = false;
  public lastScrollPosition:number;

  public currentRoute:string = '';

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
    public  auth:   AuthService,
  ){}

  ngAfterViewInit(){
    this.router.events.subscribe(
      data => {
        this.currentRoute = data['url'];
        if(this.currentRoute === '/login'){
          // if(!this.auth.loggedIn) this.showLoginForm();
        }
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition    = window.pageYOffset;

    console.log(`componentPosition: ${componentPosition}`, `scrollPosition: ${scrollPosition}`)

    // User is scrolled within 100px of the top of the page
    if (scrollPosition <= 100) {
      this.isScrolledToTop = true;
      this.hideNav = false;
    }
    // User is scrolled below the first 100px of the page
    else{
      this.isScrolledToTop = false;
      if(scrollPosition > this.lastScrollPosition){
        this.hideNav = true;
      }
      else{
        this.hideNav = false;
      }
    }

    this.lastScrollPosition = scrollPosition;
  }

  // Used instead of routerLink so we can close the side nav when clicked
  changeRoute(route){
    this.closeSideNav();
    this.router.navigate([route]);
  }

  showLoginForm(){
    this.sideNavState = 'hide';
    if(this.currentRoute === '/home' || this.currentRoute === '/login'){
      document.getElementById('show-login').style.display = "none";
      document.getElementById('hide-login').style.display = "block";

      document.getElementById('homepage-title').style.animation  = "fadeOut 2s";
      document.getElementById('homepage-title').style.visibility = "hidden";

      document.getElementById('homepage-login').style.animation  = "fadeIn 2s";
      document.getElementById('homepage-login').style.visibility = "visible";
    }
    else{
      this.loginComponent.show();
    }
  }

  hideLoginForm(){
    document.getElementById('show-login').style.display = "block";
    document.getElementById('hide-login').style.display = "none";

    document.getElementById('homepage-login').style.animation  = "fadeOut 2s";
    document.getElementById('homepage-login').style.visibility = "hidden";

    document.getElementById('homepage-title').style.animation  = "fadeIn 2s";
    document.getElementById('homepage-title').style.visibility = "visible";
  }

  toggleSideNav(){
    if(this.sideNavState == "hide" || this.sideNavState == "hidden"){
      this.sideNavState = "show";
    }
    else{
      this.closeSideNav();
    }
  }

  closeSideNav(){
    if(this.sideNavState == 'show'){
      this.sideNavState = 'hide';
    }
  }
}
