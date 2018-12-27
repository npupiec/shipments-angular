import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/_services/auth.service'
import { PackagesService } from '../packages/_services/packages.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  message: string;
  loginStatus: boolean;
 
  constructor(public authService: AuthService, public router: Router, public packagesService: PackagesService) {
    this.setMessage();
  }
 
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
 
  login() {
    this.message = 'Trying to log in ...';
 
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'packages/list';
 
        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }
 
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
