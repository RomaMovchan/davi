import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpService, TokenService } from './';
import { User, Authanswer } from '../classes';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private usersSubject = new BehaviorSubject<any>(new User());
  public users = this.usersSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private httpService: HttpService,
              private tokenService: TokenService) {}


  setAuth(answer: Authanswer) {
    this.tokenService.setToken(answer.access_token);
    this.currentUserSubject.next(answer.user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.tokenService.clearToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
  }

  getAllUsers() {
    this.httpService.get('user')
      .subscribe(
        (data) => {
          console.log(data);
          this.usersSubject.next(data.results);
        }
      );
  }

  logout() {
    this.httpService.get('user/logout')
      .subscribe(
        (data) => {
          console.log(data);
          this.purgeAuth();
        }
      );
  }

  refreshToken() {
    let tokenObj = {
      refresh_token: this.tokenService.getToken()
    };
    console.log(tokenObj);
    this.httpService.post('user/get_new_tokens_by_refresh_token/', tokenObj)
      .subscribe(
        (data) => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
