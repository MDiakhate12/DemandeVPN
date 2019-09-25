import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Demande } from '../models/demande.model';



@Component({
  selector: 'app-dashboard-securite',
  templateUrl: './dashboard-securite.component.html',
  styleUrls: ['./dashboard-securite.component.css']
})
export class DashboardSecuriteComponent implements OnInit {

    user: User = new User();
    demandes: Demande[];
  
    constructor(private authService: AuthService) { }
  
    ngOnInit() {
      this.authService.getLoggedUser().subscribe(
        user => this.user = user
      );
    }

}
