import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'

import { Observable } from 'rxjs/Observable';
import { PackagesService } from '../../packages/_services/packages.service'

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private packagesService: PackagesService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    if (this.authService.isLoggedIn) { return true; }

    this.authService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }

}
