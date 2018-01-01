import {Injectable}     from '@angular/core';
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
import 'rxjs/Rx';

@Injectable()
export class TraitsService {
  constructor(public http:HttpClient) {}

  getTraits(species){
    return this.http.get("assets/data/"+species+"-traits.json");
  }
}
