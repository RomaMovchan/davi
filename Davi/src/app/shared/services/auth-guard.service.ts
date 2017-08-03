import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    this.userService.isAuthenticated.subscribe(auth => {
      console.log('authGuard', auth);
      if (auth) {
        return true;
      } else {
        return this.router.navigate(['login']);
      }
    });

    //return this.userService.isAuthenticated.take(1);
  }
}
/*canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | boolean {*/
