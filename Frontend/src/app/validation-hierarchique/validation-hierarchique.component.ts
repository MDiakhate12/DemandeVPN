import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { User } from '../models/user.model';
import { Protocole } from '../models/protocole.model';
import { Application } from '../models/application.model';
import { Demande } from '../models/demande.model';
import { GenericService } from '../services/generic.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: '#validation-hierarchique',
  templateUrl: './validation-hierarchique.component.html',
  styleUrls: ['./validation-hierarchique.component.css']
})
export class ValidationHierarchiqueComponent implements OnInit {

  panelOpenState = true;
  step = 0;

  users: User[] = [];;
  protocoles: Protocole[] = [];;
  applications: Application[] = [];;
  demandes: Demande[] = new Array<Demande>();
  username: string;

  constructor(private demandeService: DemandeService, private genericService: GenericService, private router: ActivatedRoute, public dialog: MatDialog, public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.genericService.init(this);
    this.initDemandeEnAttenteHierarchique();
    console.log(this.router);
    console.log(this.demandes);
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  initDemandeEnAttenteHierarchique() {
    this.username = this.router.snapshot.paramMap.get("username");
    this.demandeService.getDemandeEnAttenteHierarchiqueOf(this.username).subscribe(response => {
      this.demandes = response.body;
    }
    );
  }

  validerDemande(id: number) {
    this.demandeService.acceptDemandeWithId(id).subscribe(
      data => {
        this.initDemandeEnAttenteHierarchique();
        console.log(data);
      },
      error => {
        console.error(error);
      }
    )
  }


  refuserDemande(id: number) {
    this.demandeService.rejectDemandeWithId(id).subscribe(
      data => {
        this.initDemandeEnAttenteHierarchique();
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  openDialog(id: number, action) {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(
      choice => {

        if (action.name === this.validerDemande.name) {
          if (choice) {
            this.validerDemande(id);
            this.openSnackbar("Demande validée avec succés! Envoi immédiat à l'admin sécurité", 'OK', 3000);
          }
        } else if (action.name === this.refuserDemande.name) {
          if (choice) {
            this.refuserDemande(id);
            this.openSnackbar("Demande refusée! Le demandeur sera notifié du refus", 'OK', 3000);
          }
        }

      }
    )
  }

  openSnackbar(message, dismiss, time) {
    this.snackbar.open(message, dismiss, { duration: time });
  }

}
