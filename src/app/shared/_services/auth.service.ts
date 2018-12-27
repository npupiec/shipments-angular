import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PackagesService } from '../../packages/_services/packages.service'

@Injectable()
export class AuthService {

  constructor(private packagesService: PackagesService,) {}

  isLoggedIn = false;
  redirectUrl: string;

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
