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

  openDialog(id: number, action) {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(
      choice => {

        if (action.name === this.validerDemande.name) {
          if (choice) {
            this.validerDemande(id);
            this.openSnackbar("Demande validée avec succés! Envoi immédiat des identifiants de connexion au VPN", 'OK', 3000);
          }
        } else if (action.name === this.expirerDemande.name) {
          if (choice) {
            this.expirerDemande(id);
            this.openSnackbar("Cette demande est maintenant expiré! Le VPN sera fermé", 'OK', 3000);
          }
        }

      }
    )
  }

  openSnackbar(message, dismiss, time) {
    this.snackbar.open(message, dismiss, { duration: time });
  }
}
