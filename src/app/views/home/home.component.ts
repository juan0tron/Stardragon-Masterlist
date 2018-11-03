import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.template.html',
})
export class HomeComponent {

  title = 'Welcome to The Gem Exchange!';
  links = [
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

  public lastScrollPosition:number = 0;

  // Handle nav scoll behavior here since this component does not trigger
  // the window:scroll event in the nav component
  checkScroll($event) {
    const scrollPosition = $event.path[0].scrollTop;
    // User is scrolled within 100px of the top of the page
    if (scrollPosition <= 100) {
      document.getElementById("nav").classList.add('transparent');
      document.getElementById("nav").classList.remove('hideNav');
    }
    // User is scrolled below the first 100px of the page
    else{
      document.getElementById("nav").classList.remove('transparent');
      if(scrollPosition > this.lastScrollPosition){
        document.getElementById("nav").classList.add('hideNav');
      }
      else{
        document.getElementById("nav").classList.remove('hideNav');
      }
    }
    this.lastScrollPosition = scrollPosition;
  }

  // Lazy load animation helpers
  showLayer(index){
    document.getElementById('layer-'+index).style.animation  = 'fadeIn 2s';
    document.getElementById('layer-'+index).style.visibility = 'visible';
  }

}
