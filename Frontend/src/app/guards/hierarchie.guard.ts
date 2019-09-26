import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HierarchieGuard implements CanActivate {


  constructor(private router: Router, private authService: AuthService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    let usernameFromURL = route.paramMap.get('username');
    let username = this.authService.getUsername();

    console.log("éééééééééééééééééééééééééééééééééééééééé")
    console.log(usernameFromURL)
    console.log("éééééééééééééééééééééééééééééééééééééééé")
    console.log(username)


    if (usernameFromURL != username) {

      this.router.navigate(['/dashboard']);

      console.log("FROM IF !!")
      return false;
    } else {
      return true;
    }
  }

}