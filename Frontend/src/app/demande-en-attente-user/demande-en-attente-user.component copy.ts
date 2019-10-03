import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';

import { MatTableDataSource } from '@angular/material/table';

export interface DemandeRow {
  id: number;
  objet: string;
  status: string;
  date: Date;
}

@Component({
  selector: '#app-demande-en-attente-user',
  templateUrl: './demande-en-attente-user.component.html',
  styleUrls: ['./demande-en-attente-user.component.css']
})
export class DemandeEnAttenteUserComponent implements OnInit {

  user: User = new User();
  demandes: Demande[] = new Array<Demande>();
  demandeRow: DemandeRow[];

  columns: string[];
  data: MatTableDataSource<DemandeRow> = new MatTableDataSource();


  constructor(private authService: AuthService, private router: Router, private demandeService: DemandeService) { }


  ngOnInit() {
    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;

        this.initDemandeEnAttenteOf(this.user.username);
      }
    )


    this.columns = ['id', 'objet', 'status', 'date'];


    this.demandes.forEach(demande => {
      let row = { id: demande.id, objet: demande.objet, status: demande.status_demande, date: demande.date };
      this.demandeRow.push(row);
      console.log(row);
    });
   
    this.data = new MatTableDataSource(this.demandeRow);


    console.log(this.demandeRow);
  }


  initDemandeEnAttenteOf(username: string) {
    this.demandeService.getDemandeEnAttenteOf(username).subscribe(
      response => this.demandes = response.body
    )
  }
}
