import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { LoginResponse, LoginOptions, FacebookService, InitParams } from 'ngx-facebook';

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

  public email_invalid:boolean = false;
  public password_invalid:boolean = false;

  constructor(
    private api:    GemExchangeAPI,
    private fb:     FacebookService,
    private router: Router
  ) {
    // Init Facebook
    let initParams: InitParams = {
      appId: "204041366826357",
      xfbml: true,
      version: 'v2.10'
    };
    fb.init(initParams);
  }

  login(event, email, password){
    event.preventDefault();
    this.loginError = false;

    var post_data = {
      email:    email,
      password: this.api.hashPW(password),
    }

    console.log(this.api.hashPW(password));

    localStorage.clear();
    this.api.api("/auth/login", "POST", post_data).subscribe(
      data => {
        this.loginMessage     = data.message;
        this.loginSuccess     = true;
        this.loginError       = false;
        this.email_invalid    = false;
        this.password_invalid = false;

        localStorage.setItem("auth_token", data.auth_token);
        localStorage.setItem("user_id",  data.user_id);

        this.router.navigate(['/users/' + data.user_id]);
      },
      err => {
        if(err.message == "Invalid email." || err.message == "Email is required."){
          this.email_invalid    = true;
          this.password_invalid = false;
        }
        else if(err.message == "Invalid password."){
          this.email_invalid    = false;
          this.password_invalid = true;
        }
        else{
          this.email_invalid    = false;
          this.password_invalid = false;
        }

        this.loginMessage = err.message;
        this.loginSuccess = false;
        this.loginError   = true;
      },

    );
  }

  loginWithFb(){
    const options: LoginOptions = {
      scope: 'email,public_profile',
      return_scopes: true,
      enable_profile_selector: true,
    };
    this.fb.login(options).then((response: LoginResponse) => {
      console.log('Connected to FB successfully.', response)
      localStorage.setItem("facebook_access_token", response.authResponse.accessToken);
      localStorage.setItem("facebook_uid", response.authResponse.userID);
    })
    .catch((error: any) => console.error('Failed to connect to FB.', error));
  }

}
