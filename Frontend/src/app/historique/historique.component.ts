import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { ActivatedRoute } from '@angular/router';
import { Demande } from '../models/demande.model';
import { DialogDemandeDetailComponent } from '../dialog-demande-detail/dialog-demande-detail.component';
import { MatDialog } from '@angular/material';
import { DialogDemandeHistoriqueComponent } from '../dialog-demande-historique/dialog-demande-historique.component';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  demandesAcceptees: Demande[] = [];
  demandesRefusees: Demande[] = [];
  demandesCloturees: Demande[] = [];
  loading:boolean = false;

  constructor(private demandeService: DemandeService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {

    let username = this.route.snapshot.paramMap.get('username');
    this.initDemandesAcceptees(username);
    this.initDemandesRefusees(username);
    this.initDemandesCloturees(username);
  }

  initDemandesAcceptees(username: string) {
    this.loading = true;
    this.demandeService.getDemandeAccepteesOf(username).subscribe(
      responses => {
        this.demandesAcceptees = responses.body
        console.log(this.demandesAcceptees)
        this.loading = false;
  },
      error => {
        console.error(error);
      }
    )
  }

  initDemandesRefusees(username: string) {
    this.loading = true;
    this.demandeService.getDemandeRefuseesOf(username).subscribe(
      responses => {
        this.demandesRefusees = responses.body
        this.loading = false;
      },
      error => {
        console.error(error);
      }
    )
  }

  initDemandesCloturees(username: string) {
    this.loading = true;
    this.demandeService.getDemandeClotureesOf(username).subscribe(
      responses => {
        this.demandesCloturees = responses.body
        this.loading = false;
      },
      error => {
        console.error(error);
      }
    )
  }

  openDetailDialog(demande) {
    let dialogRef = this.dialog.open(DialogDemandeHistoriqueComponent, { data: {demande: demande} } );
    console.log(dialogRef); 
  }
}

