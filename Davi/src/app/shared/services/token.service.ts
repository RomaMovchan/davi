import { Injectable } from '@angular/core';


@Injectable()
export class TokenService {

  getToken(): String {
    return window.localStorage['token'];
  }

  setToken(token: String) {
    window.localStorage['token'] = token;
  }

  clearToken() {
    window.localStorage.removeItem('token');
  }

}

