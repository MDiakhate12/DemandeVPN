import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  basURL:string = "http://localhost:8080/api/users/";
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  getAllUser(): Observable<any>{
    return this.http.get(this.basURL, {headers: this.httpHeaders});
  }

  constructor(private http: HttpClient) { }

}
