import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: '#app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );
  }

  isSecurite() {
    let role = this.authService.isSecurite();
    return role;
  }
  isAdmin() {
    let role = this.authService.isAdmin();
    return role;
  }
}
