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
      "link":"/discord"
    }
  ];

  layers:Array<HTMLElement> = [];

  constructor(){
    // Build the layers array once on page init
    this.layers = <HTMLElement[]><any>document.getElementsByClassName("parallax-layer");
  }

  // parallax scroll effect
  @HostListener('window:scroll', [])
  onWindowScroll(ev:KeyboardEvent) {
    window.requestAnimationFrame(() => {
      let topDistance = window.pageYOffset;
      for (let layer of this.layers) {
        const depth:any   = layer.getAttribute('data-depth');
        const movement    = -(topDistance * depth);
        const translate3d = `translate3d(0, ${movement}px, 0)`;
        (layer as HTMLElement).style['-webkit-transform'] = translate3d;
        (layer as HTMLElement).style['-moz-transform']    = translate3d;
        (layer as HTMLElement).style['-ms-transform']     = translate3d;
        (layer as HTMLElement).style['-o-transform']      = translate3d;
        (layer as HTMLElement).style.transform            = translate3d;
      }
    });
  }

  // Lazy load animation helpers
  showLayer(index){
    document.getElementById('layer-'+index).style.animation  = 'fadeIn 2s';
    document.getElementById('layer-'+index).style.visibility = 'visible';
  }
}
