import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getLoggedUser().subscribe(
      user =>  this.user = user
    );
  }

  demandesEnAttenteUser() {
    this.router.navigate(['/demandes/en-attente/', this.user.username]);
  }
}
