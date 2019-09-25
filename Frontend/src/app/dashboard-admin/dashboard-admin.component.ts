import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  user: User = new User();
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );
  }

}
