import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginURL = "http://localhost:8000/api/login/";
  logoutURL = "http://localhost:8000/api/logout/";

  redirectURL: string;

  
  login(user): Observable<any> {
    return this.http.post(this.loginURL, user);
  }

  // login(): Observable<boolean> {
  //   return of(true).pipe(
  //     delay(1000),
  //     tap(val => this.isLoggedIn = true)
  //   );
  // }
  logout(): Observable<any> {
      localStorage.removeItem("token");
    return this.http.get(this.logoutURL);
  }

  authenticate(user) {

  }

  isAuthenticates(user) {
  }

  getToken() {
    return localStorage.getItem('token');
  }


  
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
