import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class LoginService {
  public url = "http://localhost:8080/api/login/";
  constructor(private http: HttpClient) { }

  loginUser(userData): Observable<any> {
    return this.http.post(this.url, userData);
  };
}
