import { Injectable } from '@angular/core';
import {
  CanLoad, CanActivate, Route, Router,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';
import { take } from 'rxjs/operators/take';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canLoad(router: Route): Observable<boolean> {
  return this.userService.isAuthenticated.pipe(take(1));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.userService.isAuthenticated.pipe(take(1));
  }
}