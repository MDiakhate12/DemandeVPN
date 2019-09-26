import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';
import { User } from '../models/user.model';
import { Protocole } from '../models/protocole.model';
import { Application } from '../models/application.model';
import { GenericService } from '../services/generic.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: '#app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  public isOpen: boolean = false;
  loading: boolean = false;

  users: User[] = [];;
  protocoles: Protocole[]= [];;
  applications: Application[]= [];;
  demande: Demande = new Demande();
  user: User = new User();

  constructor(private demandeService: DemandeService, private genericService: GenericService, private router: Router, private authService: AuthService) {
    console.log(this.applications);
    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
      }
    );

  }

  ngOnInit() {
    this.genericService.init(this);
  }

  onSubmit() {
    this.loading = true;
    this.demandeService.sendDemande(this.demande).subscribe(
      response => {
        this.demande = response.body;
        console.log(this.demande.id);
        this.router.navigate(['/demande', this.demande.id]);
        this.loading = false;
      },
      error => {
        console.error('ERREUR : ' + error);
      }
    );
  }

}
