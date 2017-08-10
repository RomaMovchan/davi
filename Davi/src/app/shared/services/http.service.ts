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
    if (error.status === 400 && error.statusText === 'Unauthorized') {
      console.log('Token Expired');
    }
    return Observable.throw(error.json());
  }


  get(url: string): Observable<any> {
    this.requestUrl = this.serverUrl + url;
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
      .catch(this.handleError);
  }

  delete(url: any) {
    this.requestUrl = this.serverUrl + url;
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.requestUrl, {
      headers: headers
    })
      .catch(this.handleError);
  }

  put(url: any, data: any) {
    this.requestUrl = this.serverUrl + url;
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.requestUrl, data, {
      headers: headers
    })
      .map(data => data.json())
      .catch(this.handleError);
  }

}

