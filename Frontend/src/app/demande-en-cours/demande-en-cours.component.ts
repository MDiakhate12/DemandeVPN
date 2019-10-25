import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';
import { ActivatedRoute } from '@angular/router';
import { DemandeDetailComponent } from '../demande-detail/demande-detail.component';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogMotifRefusComponent } from '../dialog-motif-refus/dialog-motif-refus.component';
import { SearchService } from '../search.service';
import { DialogSuspensionComponent } from '../dialog-suspension/dialog-suspension.component';
import { DialogProlongationComponent } from '../dialog-prolongation/dialog-prolongation.component';

@Component({
  selector: 'app-demande-en-cours',
  templateUrl: './demande-en-cours.component.html',
  styleUrls: ['./demande-en-cours.component.css']
})
export class DemandeEnCoursComponent implements OnInit {
  demandes: Demande[] = [];
  loading:boolean = false;
  motif: any;
  message = "motif de suspension"
  motCle: string;
  selectedWord: string;
  words: any[];
  

  constructor(private demandeService : DemandeService, private route: ActivatedRoute, private dialog: MatDialog, private _search: SearchService) { 
    this.selectedWord="demandeurUsername";
    this.words =  this._search.words;
  }
  

  ngOnInit() {
    let username = this.route.snapshot.paramMap.get('username');
    this.initDemandesAcceptees(username)
  }



  initDemandesAcceptees(username: string) {
    this.loading = true;
    this.demandeService.getDemandeAccepteesOf(username).subscribe(
      responses => {
        this.demandes = responses.body.results
        
        this.loading = false;
  },
      error => {
        console.error(error);
      }
    )
  }

  openDetailDialog(demande) {
    let dialogRef = this.dialog.open(DemandeDetailComponent, { data: { demande: demande } });

    this.loading = true;
    dialogRef.beforeClosed().subscribe(
      _ => {
        if (dialogRef.componentInstance.updated || dialogRef.componentInstance.deleted) {
          let username = this.route.snapshot.paramMap.get('username');

          document.querySelector("#row-" + demande.id).classList.add('orange')
          document.querySelector("#row-" + demande.id).classList.add('animated', 'flash')

          setTimeout(_ => {
            this.initDemandesAcceptees(username)
          }, 1000)
          this.loading = false
        } else {
          this.loading = false
          return
        }
      }
    )
  }
  suspendre(id: number) {
    event.stopPropagation()

    let dialogRef = this.dialog.open(DialogSuspensionComponent, { data: { motif: this.motif} });
    dialogRef.afterClosed().subscribe(result => {
    
      if (result.motif) {
        // this.refuserDemande(id, result.motif);
      } else {
        return;
      }
    }
    )
  }
  prolonger(id: number) {
    event.stopPropagation()

    let dialogRef = this.dialog.open(DialogProlongationComponent, { data: { motif: this.motif} });
    dialogRef.afterClosed().subscribe(result => {
    
      if (result.motif) {
        // this.refuserDemande(id, result.motif);
      } else {
        return;
      }
    }
    )
  }
  Search(){
    
    // this._search.Search(this.motCle, this.selectedWord, this.demandes)
    if(this.motCle != ""){
      
      this.demandes = this.demandes.filter(
        responses=>{
          if(this.selectedWord==="objet"){
          return responses.objet.toLocaleLowerCase().match(this.motCle.toLocaleLowerCase());
          }     else if(this.selectedWord==="demandeurUsername"){
            return responses.demandeur.username.toLocaleLowerCase().match(this.motCle.toLocaleLowerCase());
          } else if(this.selectedWord==="beneficiaireUsername"){
            return responses.beneficiaire.username.toLocaleLowerCase().match(this.motCle.toLocaleLowerCase());
          }
        })
    }else if (this.motCle == ""){
      let username = this.route.snapshot.paramMap.get('username');
      this.initDemandesAcceptees(username);
    }
  }
  clearSearchField(){
    this.motCle="";
    this.ngOnInit();
  }
}
