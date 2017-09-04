import 'rxjs/Rx';
import 'rxjs/add/operator/timeout';

import sha256, { Hash, HMAC } from "fast-sha256";

import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable()

export class GemExchangeAPI {

    private base_api_url = "http://localhost:3000";

    constructor(private http:HttpClient) { }

    /**
      Makes a call to the API service.

      @params:        A valid API endpoint, starting with a /
      @add_post_data: Any additional data to be sent with the API call (optional)
    */
    api(params, request_type, add_post_data?) {

      var post_data = {}

      // Include any post data passed into this function
      if(add_post_data){
        Object.assign(post_data, add_post_data);
      }

      console.log("API CALL:", this.base_api_url + params, post_data);

      switch(request_type){
        case 'get':
          return this.http
          .get(this.base_api_url + params)
          .map((res:any) => {
            console.log("RESPONSE:", params, res);
            return res;
          });
        case 'post':
          return this.http
          .post(this.base_api_url + params, post_data)
          .map((res:any) => {
            console.log("RESPONSE:", params, res);
            return res;
          });
      }
    }

    register(form_data){}

    login(username, password){}

    logout(){}

    isLoggedIn(){
      return localStorage.getItem("logged_in")
    }

    hashPW(password){
      var pw_hash:any = sha256(password);
          pw_hash     = btoa(String.fromCharCode.apply(null, pw_hash));

      return pw_hash;
    }
}
