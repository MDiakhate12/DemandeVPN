import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';
import { MatDialog } from '@angular/material';
import { DialogDemandeHistoriqueComponent } from '../dialog-demande-historique/dialog-demande-historique.component';

@Component({
  selector: 'app-historique-securite',
  templateUrl: './historique-securite.component.html',
  styleUrls: ['./historique-securite.component.css']
})
export class HistoriqueSecuriteComponent implements OnInit {

  demandesValideesSecurite: Demande[] = [];

  constructor(private demandeService: DemandeService, private dialog: MatDialog) { }

  ngOnInit() {
    this.initDemandeValideesSecurite();
  }

  initDemandeValideesSecurite() {
    this.demandeService.getDemandeValideesSecurite().subscribe(
      response => {
        this.demandesValideesSecurite = response.body
      },
      error => {
        console.error(error);
      }
    )
  }


  openHistoriqueDialog(demande) {
    let dialogRef = this.dialog.open(DialogDemandeHistoriqueComponent, { data: {demande: demande} } );
    console.log(dialogRef); 
  }
}
