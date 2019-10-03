import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})


export class LoginService {
  loginURL = "http://localhost:8080/api/login/";
  logoutURL = "http://localhost:8080/api/logout/";
  userURL = "http://localhost:8080/api/users/";

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + this.getToken()
  })
  
  constructor(private http: HttpClient,
              private router: Router) { }

  loginUser(userData): Observable<any> {
    return this.http.post(this.loginURL, userData);
  };

  loggedIn(){
    return !!localStorage.getItem("key"); 
  }
  
  logOut(){
    localStorage.clear()
    this.router.navigate(["/login"]);
  }
  getToken() {
    return localStorage.getItem('key');
  }
  
  getUserId() {
    return localStorage.getItem('id');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUserWithId(id: number): Observable<User> {
    let loginURL = this.userURL + id + "/";
    return this.http.get<User>(loginURL, { headers: this.httpHeaders });
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

