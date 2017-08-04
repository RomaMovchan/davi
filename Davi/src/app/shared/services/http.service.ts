import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { TokenService } from './token.service';

@Injectable()
export class HttpService {
  serverUrl: string = environment.SERVER_URL + environment.API_URL;
  requestUrl: string;

  constructor(
    private http: Http,
    private tokenService: TokenService
  ) {}

  private createAuthorizationHeader(headers: Headers) {
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    if (this.tokenService.getToken()) {
      headers.append('Authorization', `Token ${this.tokenService.getToken()}`);
    }
  }

  private handleError(error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }


  get(url: string): Observable<any> {
    this.requestUrl = this.serverUrl + url;
    console.log(this.requestUrl);
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.requestUrl, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }

  post(url: string, data: any): Observable<any> {
    this.requestUrl = this.serverUrl + url;
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.requestUrl, data, {
      headers: headers
    })
      .map((data: Response) => data.json())
      // .catch(this.handleError)
  }

/*

  delete(url: any) {
    this.requestUrl = this.serverUrl + url;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.delete(this.requestUrl, {
      headers: headers
    })
      .catch(this.handleError);
  }

  put(url: any, data: any) {
    this.requestUrl = this.serverUrl + url;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.put(this.requestUrl, data, {
      headers: headers
    })
      .map(data => console.log(data.statusText))
      .share()
      .catch(this.handleError);

  }
*/
}

