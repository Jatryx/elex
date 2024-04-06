import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './services/servicioAuthService/authService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    console.log('Guard activated');
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      console.log('User not logged in, redirecting to login page');
      this.router.navigate(['/login']);
      return false;
    }
  }
}