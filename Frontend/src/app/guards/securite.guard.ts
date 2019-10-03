import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecuriteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRole();
  }

  checkRole() {
    if(this.authService.isSecurite() === true) {
      return true;  
    }
    this.router.navigate(['/dashboard']);
    return false;
  }

}
