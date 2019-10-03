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
  selector: 'app-validation-admin',
  templateUrl: './validation-admin.component.html',
  styleUrls: ['./validation-admin.component.css']
})
export class ValidationAdminComponent implements OnInit {

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
    this.initDemandeEnAttenteAdmin();
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

  initDemandeEnAttenteAdmin() {
    this.demandeService.getDemandeEnAttenteAdminOf().subscribe(response => {
      console.log(response);
      this.demandes = response.body;
    }
    );
  }

  validerDemande(id: number) {
      this.demandeService.configureDemandeWithId(id).subscribe(
        data => {
          this.initDemandeEnAttenteAdmin();
          console.log(data);
        },
        error => {
          console.error(error);
        }
      )
  }


  expirerDemande(id: number) {
    this.demandeService.expirationDemandeWithId(id).subscribe(
      data => {
        this.initDemandeEnAttenteAdmin();
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  openValidationDialog(id: number) {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(choice => {
        console.log(choice);
        if (choice === 'true') {
          this.validerDemande(id);
          this.openSnackbar("Demande validée avec succés! Envoi immédiat à l'admin sécurité", 'OK', 3000);
        } else {
          return;
        }
      }
    )
  }

  openDenialDialog(id: number) {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(choice => {
        console.log(choice);
        if (choice === 'true') {
          this.expirerDemande(id);
          this.openSnackbar("Demande refusée ! Le demandeur sera notifié du refus", 'OK', 3000);
        } else {
          return;
        }
      }
    )
  }

  openSnackbar(message, dismiss, time) {
    this.snackbar.open(message, dismiss, { duration: time });
  }
}
