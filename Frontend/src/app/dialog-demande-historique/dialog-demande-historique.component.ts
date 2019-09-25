import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Demande } from '../models/demande.model';


@Component({
  selector: 'app-dialog-demande-historique',
  templateUrl: './dialog-demande-historique.component.html',
  styleUrls: ['./dialog-demande-historique.component.css']
})
export class DialogDemandeHistoriqueComponent {

  demande: Demande;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log(data)
    this.demande = data.demande;
  }

}
