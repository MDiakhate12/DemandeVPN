import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User = new User();
  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );
  }

  logout() {
    this.authService.logout().subscribe(
      _ => {
        this.router.navigate(["/login"]);
      },
      
      error => {
        console.error(error);
      }
    )
  }
}
