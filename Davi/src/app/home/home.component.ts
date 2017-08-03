import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getAllUsers() {
    this.userService.getAllUsers();
    this.userService.users.subscribe(users => {
      console.log('users', users);
    });
  }

  logout() {
    this.userService.logout();
    this.userService.isAuthenticated.subscribe(auth => {
      if (!auth) {
        console.log('logout');
      }
    })
  }

}
