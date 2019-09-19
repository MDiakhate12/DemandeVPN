import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: '#app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  input = {};
  key: String;
  message: String;

  constructor(private _loginService:LoginService,
              private router: Router) {
                if(this._loginService.loggedIn()){
                  this.router.navigate(['/dashboard'])
                }
              }

  ngOnInit() {
    this.input = {
      username: '',
      password: ''
    };

    
  }
  onLogin(){
    this._loginService.loginUser(this.input)
    .subscribe(
      response => {
        this.key=response;
        console.log(response);
        this.router.navigate(['/dashboard']);
        localStorage.setItem("key",response.key);
        
    },
    error =>{
      this.message="Les informations fournies sont incorrectes.";
      // console.log('error',error);
    } 
    );
  };
 
}
