// Angular
import { Component } from '@angular/core';
import { Router }    from '@angular/router';

// Services
import { AuthService } from 'app/services/auth.service';

@Component({
    selector:    'login',
    templateUrl: 'login.template.html',
    providers:   [AuthService]
})

export class LoginComponent {

  public email:    string;
  public password: string;
  public error:    string;

  public email_invalid:boolean    = false;
  public password_invalid:boolean = false;

  constructor(
    public  auth:   AuthService,
    private router: Router
  ) {}

  login(){
    if(!this.email){
      this.email_invalid = true;
    }
    else if(!this.password){
      this.password_invalid = true;
    }
    else{
      this.auth.login(this.email, this.password)
        .subscribe(
          data => {
            this.router.navigate['/dashboard'];
          },
          err  => {
            this.error = err.message;
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
          }
        );
    }
  }

}
