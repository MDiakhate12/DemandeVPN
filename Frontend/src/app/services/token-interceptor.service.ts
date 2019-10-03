import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


  constructor(private injector: Injector) { }
 
  intercept(req, next) {
    let authService = this.injector.get(AuthService);
    if (authService.isLoggedIn()) {
      let authReq = req.clone({
        setHeaders: {
          Authorization: 'Token ' + authService.getToken()
        }
      });
      console.log(authReq);
      return next.handle(authReq);
    }
  }
}
