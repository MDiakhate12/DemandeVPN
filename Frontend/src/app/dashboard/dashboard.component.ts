import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: '#app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User = new User();

  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this._loginService.getLoggedUser().subscribe(
      user => this.user = user
    );
  }

  demandesEnAttenteUser() {
    this.router.navigate(['/demandes/en-attente/',this.user.username]);
    console.log("-------------------------------");
    console.log(this.user.username);
    console.log("-------------------------------");
  }

}
