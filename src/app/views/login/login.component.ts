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

  constructor(
    public  auth:   AuthService,
    private router: Router
  ) {}

  login(){
    this.auth.login(this.email, this.password);
  }

}
