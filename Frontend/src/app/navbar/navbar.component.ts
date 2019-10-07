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
  initial: string;
  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.initial = user.username[0]
      }
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

  isSecurite() {
    let role = this.authService.isSecurite();
    return role;
  }
  isAdmin() {
    let role = this.authService.isAdmin();
    return role;
  }
}
