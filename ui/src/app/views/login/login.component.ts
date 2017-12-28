import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { GemExchangeAPI } from './../../../services/api.service';

@Component({
    selector:    'login',
    templateUrl: 'login.template.html',
    providers:   [GemExchangeAPI]
})

export class LoginComponent {

  private show_form:boolean    = false;
  private requires_2fa:boolean = false;
  public loginError:boolean    = false;
  public loginSuccess:boolean  = false;
  public loginMessage:string   = '';

  constructor(
    private api:    GemExchangeAPI,
    private router: Router
  ) {}

  login(event, email, password){
    event.preventDefault();
    this.loginError = false;

    var post_data = {
      email:    email,
      password: this.api.hashPW(password),
    }

    console.log(this.api.hashPW(password));

    this.api.api("/auth/login", post_data, "POST").subscribe(
      data => {
        this.loginMessage = data.message;
        this.loginSuccess = true;
        this.loginError   = false;

        localStorage.clear();
        localStorage.setItem("auth_token", data.auth_token);
        localStorage.setItem("email", email);

        // if (data === true) {
        //   this.router.navigate(['']);
        // }
        // if (data === 'requires_2fa') {
        //   this.requires_2fa = true;
        // }
      },
      err => {
        this.loginMessage = err.message;
        this.loginSuccess = false;
        this.loginError   = true;
      }
    );
  }

}
