import { Component, OnDestroy } from '@angular/core';

import { TokenService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'app';

  constructor(private tokenService: TokenService) {
  }

  ngOnDestroy() {
   // this.tokenService.clearToken();
  }
}
