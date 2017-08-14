import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { CookieService } from 'angular2-cookie/services/cookies.service';


@Injectable()
export class TokenService {
  options: Object = {};
  serverUrl: string = environment.SERVER_URL + environment.API_URL;
  requestUrl: string;

  constructor( private cookieService: CookieService, private http: Http) {
    let date = new Date();
    const expiresTime = new Date(date.getTime() + 14 * 24 * 60 * 60 * 1000);
    this.options = {
      secure: true
    };
  }

  public refreshToken(): any {
    const payload = {
      refresh_token: this.getRefreshToken()
    };
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Token ${this.getToken()}`);
    const options = new RequestOptions({ headers: headers });
    this.requestUrl = this.serverUrl + 'user/get_new_tokens_by_refresh_token/';

    return Observable.create(
      observer => {
        this.http.post(this.requestUrl, payload, options)
          .map(res => res.json()).subscribe((data) => {
            observer.next(data);
            observer.complete();
          },
          (error) => {
            Observable.throw(error);
          }
        );
      });
  }

  public getToken(): string {
    return this.cookieService.get('access_token');
  }

  public getRefreshToken(): string {
    return this.cookieService.get('refresh_token');
  }

  public getExpirationTime(): any {
    return this.cookieService.get('refresh_token_expires');
  }

  public setToken(token: string, refresh_token: string, refresh_token_expires: any) {
    this.cookieService.put('access_token', token);
    this.cookieService.put('refresh_token', refresh_token);
    this.cookieService.put('refresh_token_expires', refresh_token_expires);
   /* var updatedCookie = 'access_token' + '=' + token + ';secure';
    console.log('updatedCookie', updatedCookie);
    document.cookie = updatedCookie;
    console.log('document.cookie', document.cookie);*/
  }

  public clearToken() {
    this.cookieService.remove('access_token');
    this.cookieService.remove('refresh_token');
  }

  /*public getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  public setCookie(name, value, options) {
    options = options || {};
    let expires = options.expires;
    if (typeof expires == 'number' && expires) {
      let d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (let propName in options) {
      updatedCookie += '; ' + propName;
      let propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    console.log('updatedCookie', updatedCookie);
    document.cookie = updatedCookie;
    console.log('document.cookie', document.cookie);
  }

  public deleteCookie(name) {
    this.setCookie(name, '', {
      expires: -1
    })
  }
*/

}

