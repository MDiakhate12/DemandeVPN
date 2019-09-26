import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginURL = "http://localhost:8000/api/login/";
  logoutURL = "http://localhost:8000/api/logout/";
  userURL = "http://localhost:8000/api/users/";

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + this.getToken()
  })

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
    localStorage.clear();
    return this.http.get(this.logoutURL);
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('id');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUserWithId(id: number): Observable<User> {
    let url = this.userURL + id + "/";
    return this.http.get<User>(url, { headers: this.httpHeaders });
  }

  getLoggedUser() {
    let id = parseInt(this.getUserId());
    return this.getUserWithId(id);
  }

  isSecurite() {
    let role = localStorage.getItem('is_securite');
    return true ? role === 'true' : false;
  }

  isAdmin() {
    let role = localStorage.getItem('is_admin');
    return true ? role === 'true' : false;
  }


}
