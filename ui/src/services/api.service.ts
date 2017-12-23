import 'rxjs/Rx';
import 'rxjs/add/operator/timeout';

import sha256, { Hash, HMAC } from "fast-sha256";

import { Injectable }              from '@angular/core';
import {
  Headers,
  Response,
  RequestOptions,
}                     from '@angular/http';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpParams,
}                     from '@angular/common/http';

import { environment } from './../environments/environment';

@Injectable()

export class GemExchangeAPI {

    constructor(private http:HttpClient) { }

    /**
     *  @function    api
     *  @description Calls the Wylei API.
     *  @param {String} params       - A valid API endpoint, starting with a /
     *  @param {String} body         - Any additional data to be sent with the API call (optional)
     *  @param {String} request_type - PUT, DELETE, POST, GET, etc. Defaults to POST.
     *  @return {Object}
     */
    api(params, body = {}, request_type = "POST") {
      let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

      if(localStorage.getItem("auth_token")){
        headers = new HttpHeaders()
          .set('auth-token', localStorage.getItem("auth_token"))
          .set('Content-Type', 'application/json');
      }

      if(this.isDev()){
        console.log("API CALL:", environment.api_url + params, headers, body);
      }

      // Determine Request type and make the appropriate call
      var api_request;
      switch(request_type){
        case "GET":
          api_request = this.http.get(environment.api_url + params, {headers:headers});
          break;
        case "POST":
          api_request = this.http.post(environment.api_url + params, body, {headers:headers});
          break;
        case "PUT":
          api_request = this.http.put(environment.api_url + params, body, {headers:headers});
          break;
        case "PATCH":
          api_request = this.http.patch(environment.api_url + params, body, {headers:headers});
          break;
        case "DELETE":
          api_request = this.http.delete(environment.api_url + params, {headers:headers});
          break;
      }

      // Modify API Response
      return api_request.map((res:any) => {
        console.log("RESPONSE:", params, res);
        return res;
      });
    }

    register(form_data){}

    login(username, password){}

    logout(){}

    /**
      *  @function    isLoggedIn
      *  @description Checks localStorage to see if user is logged in
      *  @return {boolean}
      */
    isLoggedIn(){
      if(localStorage.getItem("logged_in") == "true"){
        return true;
      }
      else{
        return false;
      }
    }

    /**
      */
    isDev(){
      if(!environment.production){
        return true;
      }
      return false;
    }

    /**
      *  @function    hashPW
      *  @description Hashes a password in SHA256
      *  @param  {String} password
      *  @return {String}
      */
    hashPW(password){
      var pw_hash:any = sha256(password);
          pw_hash     = btoa(String.fromCharCode.apply(null, pw_hash));

      return pw_hash;
    }
}
