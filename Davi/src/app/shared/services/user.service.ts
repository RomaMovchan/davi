import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

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

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  constructor(private httpService: HttpService,
              private tokenService: TokenService,
              private http: Http) {}


  setAuth(answer: Authanswer) {
    this.tokenService.setToken(answer.access_token);
    console.log(this.tokenService.getToken());
    this.currentUserSubject.next(answer.user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.tokenService.clearToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
  }
}
