// Angular
import { Component } from '@angular/core';
import { Router }    from '@angular/router';

// Services
import { GemExchangeAPI } from 'app/services/api.service';

@Component({
    selector:    'login',
    templateUrl: 'login.template.html',
    providers:   [GemExchangeAPI]
})

export class LoginComponent {

  public show_form:boolean     = false;
  public requires_2fa:boolean  = false;
  public loginError:boolean    = false;
  public loginSuccess:boolean  = false;
  public loginMessage:string   = '';

  public email_invalid:boolean    = false;
  public password_invalid:boolean = false;

  constructor(
    public api:    GemExchangeAPI,
    private router: Router
  ) {}

  login(event, email, password){
    event.preventDefault();
    this.loginError = false;

    var post_data = {
      email:    email,
      password: this.api.hashPW(password),
    }

    localStorage.clear();
    this.api.api("/auth/login", "POST", post_data).subscribe(
      data => {
        this.loginMessage     = data.message;
        this.loginSuccess     = true;
        this.loginError       = false;
        this.email_invalid    = false;
        this.password_invalid = false;

        localStorage.setItem("auth_token", data.auth_token);
        localStorage.setItem("user_id",    data.user_id);

        this.api.cacheUserData(data);

        this.router.navigate(['/dashboard']);
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

}
