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
    headers.append('Authorization', 'Bearer ' +
      this.tokenService.getToken());
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }

  /*get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this._http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }*/

  get(url: any) {
    this.requestUrl = this.serverUrl + url;
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.requestUrl, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
  }
/*
  getStatus(url: any) {
    this.requestUrl = this.serverUrl + url;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.get(this.requestUrl, {
      headers: headers
    }).map((data: Response) =>  data);
  }

  post(url: any, data: any, flag?: boolean) {
    this.requestUrl = this.serverUrl + url;
    let headers = new Headers();
    if (flag) {
      this.createRegistrationHeader(headers);
      console.log('headers Registration', headers);
    } else {
      this.createAuthorizationHeader(headers);
      console.log('headers Auth', headers);
    }
    return this._http.post(this.requestUrl, data, {
      headers: headers
    })
      .share()
      .map((data: Response) => data.json())

      .catch(this.handleError);
  }

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

  createAuthorizationHeader(headers: Headers) {
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' +
      sessionStorage.getItem('token'));
  }

  createRegistrationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
  }

  private handleError(error: any ) {
    console.log(error);
    return Observable.throw(error.json());
  }*/
}

