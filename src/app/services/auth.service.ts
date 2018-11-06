import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router }     from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import sha256, { Hash, HMAC } from "fast-sha256";

import { GemExchangeAPI } from './api.service';

@Injectable()
export class AuthService {

  constructor(
    private http:   HttpClient,
    private api:    GemExchangeAPI,
    public  router: Router
  ) { }

  login(email: string, password:string) {
    localStorage.clear();
    return this.api.api('/auth/login', "POST", {email: email, password: this.hash(password)});
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/home']);
  }

  loggedIn():boolean {
    return (localStorage.getItem('auth_token') !== null);
  }

  hash(password){
    var pw_hash:any = sha256(password);
        pw_hash     = btoa(String.fromCharCode.apply(null, pw_hash));
    return pw_hash;
  }

}
