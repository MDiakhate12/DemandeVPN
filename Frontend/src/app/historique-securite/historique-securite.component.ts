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
  loading: boolean = false;
  motCle: String;

  constructor(private demandeService: DemandeService, private dialog: MatDialog) { }

  ngOnInit() {
    this.initDemandeValideesSecurite();
  }

  initDemandeValideesSecurite() {
        this.loading = true;
        this.demandeService.getDemandeValideesSecurite().subscribe(
      response => {
        this.demandesValideesSecurite = response.body.results
        this.loading = false;
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
  Search(){
    if(this.motCle != ""){
      
      this.demandesValideesSecurite = this.demandesValideesSecurite.filter(
        responses=>{
          
          return responses.demandeur.username.toLocaleLowerCase().match(this.motCle.toLocaleLowerCase());
        })
    }else if (this.motCle == ""){
      this.ngOnInit();
    }
  }
  clearSearchField(){
    this.motCle="";
    this.ngOnInit();
  }
}
