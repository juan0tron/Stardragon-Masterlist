import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router }     from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import sha256, { Hash, HMAC } from "fast-sha256";

import { environment } from 'environments/environment';

@Injectable()
export class AuthService {

  constructor(
    private http:   HttpClient,
    public  router: Router
  ) { }

  login(email: string, password:string) {
    localStorage.clear();
    return this.http.post(`${environment.api_url}/auth/login`, {email: email, password: this.hash(password)});
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/home']);
  }

  loggedIn():boolean {
    return (localStorage.getItem('auth_token') !== null);
  }

  /**
   *  @function isDev
   *  @description Checks if the current environment or user is dev
   *  @return {boolean}
   */
  isDev(){
    if(!environment.production){
      return true;
    }
    return false;
  }

  hash(password){
    var pw_hash:any = sha256(password);
        pw_hash     = btoa(String.fromCharCode.apply(null, pw_hash));
    return pw_hash;
  }

}
