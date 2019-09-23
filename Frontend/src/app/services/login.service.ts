import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class LoginService {
  public url = "http://localhost:8080/api/login/";
  constructor(private http: HttpClient,
              private router: Router) { }

  loginUser(userData): Observable<any> {
    return this.http.post(this.url, userData);
  };

  loggedIn(){
    return !!localStorage.getItem("key"); 
  }
  
  logOut(){
    localStorage.removeItem("key");
    this.router.navigate(["/login"]);
  }
  getToken() {
    return localStorage.getItem('key');
  }
}
