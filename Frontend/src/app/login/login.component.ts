import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: '#app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  input = {};

  constructor(private authService: AuthService, private router: Router) {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
   }

  ngOnInit() {
    this.input = {
      username: '',
      password: ''
    };

    
  }
  onLogin(){
    console.log(this.input);
    this.authService.login(this.input)
    .subscribe(response => {
      console.log(response);
      for(let [key, value] of Object.entries(response)) {
      localStorage.setItem(key, (value as string));
    }

      this.router.navigate(['/dashboard']);
    },
    error =>{
      console.log(this.authService);
      console.log('error',error);
      console.log("Wrong credentials !");
    } 
    );
  };

}
