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

import { GemExchangeAPI } from 'app/services/api.service';

@Injectable()
export class ComicService {

  // public baseUrl = 'http://192.168.1.80:8000'
  public baseUrl = 'http://cms.thegemexchange.net'

  constructor(private http: HttpClient){}

  getPage(page_number){
    return this.http.get(this.baseUrl+'/api/pages/?fields=%2A&format=json&type=comic.ComicPage&order=-page_number&limit=1&page_number='+page_number)
      .map((data:any) => {
        let comicData = {
          'url': this.baseUrl + data['items'][0]['comic']['meta']['download_url'],
          'page': data['items'][0]['page_number']
        }
        return comicData
      })
  }

  getFirstPage(){
    return this.http.get(this.baseUrl+'/api/pages/?fields=%2A&format=json&type=comic.ComicPage&order=page_number&limit=1')
      .map((data:any) => {
        let comicData = {
          'url': this.baseUrl+data['items'][0]['comic']['meta']['download_url'],
          'page': data['items'][0]['page_number']
        }
        return comicData
      })
  }

  getLastPage(){
    return this.http.get(this.baseUrl+'/api/pages/?fields=%2A&format=json&type=comic.ComicPage&order=-page_number&limit=1')
    .map((data:any) => {
      let comicData = {
        'url': this.baseUrl+data['items'][0]['comic']['meta']['download_url'],
        'page': data['items'][0]['page_number']
      }
      return comicData
    })
  }

  getAllPages(){
    return this.http.get(this.baseUrl+'/api/pages/?fields=%2A&format=json&type=comic.ComicPage&order=-page_number')
  }

  getPageCount(){
    return this.http.get(this.baseUrl+'/api/pages/?format=json&type=comic.ComicPage')
      .map((data:any) => {
        return data['items'].length
      })
  }

}
