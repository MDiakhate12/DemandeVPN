import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }


  checkLogin(url: string): boolean {
    if(this.authService.isLoggedIn()) return true;
    console.log('is logged in : ', this.authService.isLoggedIn())
    this.authService.redirectURL = url;
    this.router.navigate(['/login']);
    return false;
  }
  
}
