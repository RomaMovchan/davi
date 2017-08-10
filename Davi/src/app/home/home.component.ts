import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(isAuth => {
      if (!isAuth) {
        console.log('NotAuth', isAuth);
        this.router.navigateByUrl('/login');
        return;
      } else {
        console.log('Auth', isAuth);
      }
    })
  }

  public getAllUsers() {
    this.userService.getAllUsers();
    this.userService.users.subscribe(users => {
      console.log('users', users);
    });
  }

  public logout() {
    this.userService.logout();
    this.userService.isAuthenticated.subscribe(auth => {
      if (!auth) {
        console.log('logout');
      }
    })
  }

  public refresh() {
    this.userService.refreshToken();
  }


}
