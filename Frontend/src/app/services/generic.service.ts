import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  baseURL = "http://localhost:8000/api/";

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + this.authService.getToken()
  })
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllApplication (): Observable<any> {    
    let url = "applications/";
    return this.http.get(this.baseURL + url, {headers: this.httpHeaders});
  }

  getAllProtocole(): Observable<any> {
    let url = "protocoles/";
    return this.http.get(this.baseURL + url, {headers: this.httpHeaders});
  }

  
  getAllUser(): Observable<any>{
    let url = "users/";
    return this.http.get(this.baseURL + url, {headers: this.httpHeaders});
  }

  init(target:any) {
    
    target.genericService.getAllUser().subscribe(
      // mapAndPush(data, attribute)

      data => {
        data.map(user => {
          target.users.push(user);
        })
      }
    );
    target.genericService.getAllProtocole().subscribe(
      data => {
        data.map(protocole => {
          target.protocoles.push(protocole);
        })
      }
    );
    target.genericService.getAllApplication().subscribe(
      data => {
        data.map(application => {
          target.applications.push(application);
        })
      }
    );
  }
}
