import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { HttpService } from '../shared/services/http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  error = false;

  constructor(private httpService: HttpService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder
  ) {
    this.authForm = fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  public onAuth() {

  }

}
