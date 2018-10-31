import 'rxjs/Rx';
import 'rxjs/add/operator/timeout';

import sha256, { Hash, HMAC } from "fast-sha256";

import { Observable } from 'rxjs/Rx';

import { Injectable, Optional } from '@angular/core';
import {
  Headers,
  Response,
  RequestOptions,
} from '@angular/http';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpParams,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { default as swal} from 'sweetalert2';

import { User } from 'app/models/user'

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GemExchangeAPI {

  constructor(
    private http:HttpClient,
    public  router:Router
  ) { }

  /**
   *  @function    api
   *  @description Calls the Wylei API.
   *  @param {String} params       - A valid API endpoint, starting with a /
   *  @param {String} request_type - PUT, DELETE, POST, PATCH, GET, etc. Defaults to POST.
   *  @param {String} body         - Any additional data to be sent with the API call (optional)
   *  @return {Object}
   */
  api(params, request_type = "POST", body = {}) {

    // Log all calls to console for devs
    if(this.isDev()){
      console.log(request_type+":", environment.api_url + params, body);
    }

    // Determine Request type and make the appropriate call
    var api_request;
    switch(request_type){
      case "GET":
        api_request = this.http.get(environment.api_url + params);
        break;
      case "POST":
        api_request = this.http.post(environment.api_url + params, body);
        break;
      case "PUT":
        api_request = this.http.put(environment.api_url + params, body);
        break;
      case "PATCH":
        api_request = this.http.patch(environment.api_url + params, body);
        break;
      case "DELETE":
        api_request = this.http.delete(environment.api_url + params);
        break;
    }

    // Modify API Response
    return api_request
      // Success
      .map((res:Response) => {
        console.log("RESPONSE:", params, res);
        return res;
      })
      // Error
      .catch((error:any) => {
        if (this.isDev()) console.error(`ERROR: ${request_type} ${params}`, error);
        switch(error.status){
          case 401: // Unauthorized
            this.logout();
            swal("Session Expired","Your session has expired. Please log in again.","error");
            break;
          default:
            swal("Error",error.error.message || error.message,"error");
            break;
        }
        return Observable.throw(error.error.message || error.message);
      });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  /**
    *  @function    isLoggedIn
    *  @description Checks localStorage to see if user is logged in
    *  @return {boolean}
    */
  isLoggedIn(){
    if(localStorage.getItem("auth_token")){
      return true;
    }
    else{
      return false;
    }
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
}
