import { Injectable } from '@angular/core';

import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class TokenService {
  options: Object = {};

  constructor( private cookieService: CookieService ) {
    let date = new Date();
    const expiresTime = new Date(date.getTime() + 14 * 24 * 60 * 60 * 1000);
    this.options = {
      secure: true
    };
  }

  public getToken(): string {
    return this.cookieService.get('access_token');
  }

  public getRefreshToken(): string {
    return this.cookieService.get('refresh_token');
  }

  public setToken(token: string) {
    this.cookieService.put('access_token', token);
   /* var updatedCookie = 'access_token' + '=' + token + ';secure';
    console.log('updatedCookie', updatedCookie);
    document.cookie = updatedCookie;
    console.log('document.cookie', document.cookie);*/
  }

  public setRefreshToken(refresh_token: string) {
    this.cookieService.put('refresh_token', refresh_token);
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

