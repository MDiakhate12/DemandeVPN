import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: '#app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  input = {};

  constructor(private authService: AuthService, private router: Router) { }

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
      localStorage.setItem('token', response.key);

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
