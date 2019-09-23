import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';
import { User } from '../models/user.model';
import { Protocole } from '../models/protocole.model';
import { Application } from '../models/application.model';
import { GenericService } from '../services/generic.service';
import { Router } from '@angular/router';

@Component({
  selector: '#app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  public isOpen: boolean = false;

  users: User[];
  protocoles: Protocole[];
  applications: Application[];
  demande: Demande;

  constructor(private demandeService: DemandeService, private genericService: GenericService, private router: Router) {
    this.applications = [];
    this.protocoles = [];
    this.users = [];
    this.demande = new Demande();
    console.log(this.applications);
  }

  ngOnInit() {
    
    this.genericService.init(this);
    console.log(this.applications);

  }

  onSubmit() {

    this.demandeService.sendDemande(this.demande).subscribe(
      response => {
        this.demande = response.body;
        console.log("###########################");
        console.log(this.demande);
        console.log("###########################");
        this.router.navigate(['/demande', this.demande.id]);

      },
      error => {
        console.error('ERREUR : ' + error);
      }
    );
  }

}
