import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(private authService: LoginService,
              private router: Router){}

  canActivate(): boolean {
    //   if(this.authService.loggedIn()){
    //     return true;
    //   }else {
    //     console.log(this.authService.loggedIn());
    //     this.router.navigate(['login']);
    //     return false;
    //   }
    // }
    return true;
  }
}
