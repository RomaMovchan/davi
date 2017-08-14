import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { AuthAnswer } from '../classes/auth_answer';

@Injectable()
export class HttpService {
  serverUrl: string = environment.SERVER_URL + environment.API_URL;
  requestUrl: string;

  constructor(
    private tokenService: TokenService,
    private http: Http,
    private router: Router
  ) {

  }

  private createAuthorizationHeader(headers: Headers) {
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    if (this.tokenService.getToken()) {
      headers.append('Authorization', `Token ${this.tokenService.getToken()}`);
    }
  }


  private handleError(error: any) {
    console.log(error);
    const catch_error = error.json();
    if (catch_error.detail.hasOwnProperty('error')) {
      if (catch_error.detail.error[0] === 'Token expired' && catch_error.status_code === 401) {
        console.log(true);
        this.router.navigate(['login']);
        return;
       /* const token_expiration = new Date(this.tokenService.getExpirationTime());
        const date_now = new Date();
        if (token_expiration <= date_now) {
          this.router.navigate(['login']);
          return;
        }*/
      } else {
        if (catch_error.detail.error[0] === 'Invalid token' && catch_error.status_code === 401) {
          this.tokenService.refreshToken().subscribe((data: AuthAnswer) => {
            this.tokenService.setToken(data.access_token, data.refresh_token, data.refresh_token_expires);
          });
          return Observable.throw(false);
        } else {
          return Observable.throw(error.json());
        }
      }
    } else {
      return Observable.throw(error.json());
    }
  }

  get(url: string): Observable<any> {
    this.requestUrl = this.serverUrl + url;
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.requestUrl, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError.bind(this))
  }

  post(url: string, data: any): Observable<any> {
    this.requestUrl = this.serverUrl + url;
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.requestUrl, data, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError.bind(this));
  }

  delete(url: any) {
    this.requestUrl = this.serverUrl + url;
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.requestUrl, {
      headers: headers
    })
      .catch(this.handleError.bind(this));
  }

  put(url: any, data: any) {
    this.requestUrl = this.serverUrl + url;
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.requestUrl, data, {
      headers: headers
    })
      .map(data => data.json())
      .catch(this.handleError.bind(this));
  }

}

