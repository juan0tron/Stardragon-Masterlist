// Angular
import { Component } from '@angular/core';
import { Router }    from '@angular/router';

// 3rd Party
import { LoginResponse, LoginOptions, FacebookService, InitParams } from 'ngx-facebook';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
    selector:    'register',
    templateUrl: 'register.template.html',
    providers:   [GemExchangeAPI]
})

export class RegisterComponent {

  constructor(public api:GemExchangeAPI){}

  register(name, email, password){
    let newUser = {
      name,
      email,
      password: this.api.hashPW(password)
    };
    this.api.api("/users", "POST", newUser).subscribe(
      data => {},
      err  => {},
      ()   => {}
    );
  }

}
