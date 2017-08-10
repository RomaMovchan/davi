import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { HttpService } from '../shared/services/http.service';
import { TokenService } from '../shared/services/token.service';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Error } from '../shared/classes/errors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  errors: Error = new Error();
  options: any;

  constructor(private httpService: HttpService,
              private userService: UserService,
              private tokenService: TokenService,
              private CookieService: CookieService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder
  ) {
    this.authForm = fb.group({
      'username': new FormControl('test@test.com'),
      'password': new FormControl('test123')
    });
  }

  ngOnInit() {
  }

  public onAuth() {
    let payload = {
      password: this.authForm.value.password,
      username: this.authForm.value.username,
    };

    this.httpService.post('user/login/', payload)
      .subscribe(
        data => {
          console.log(data);
          this.userService.setAuth(data);
          this.router.navigate(['home']);
          //this.router.navigateByUrl('/home');
        },
        error => {
          console.log(error);
          this.errors = error;
          this.userService.purgeAuth();
        }
      );
  }

}
