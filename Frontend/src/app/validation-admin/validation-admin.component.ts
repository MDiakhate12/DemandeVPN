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
import { DialogAdminCredentialFormComponent } from '../dialog-admin-credential-form/dialog-admin-credential-form.component';

export interface Credentials {
  username:string;
  password:string;
}

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
  loading:boolean = false;

  vpnUsername:string;
  vpnPassword:string;

  constructor(private demandeService: DemandeService, private genericService: GenericService, private router: ActivatedRoute, public dialog: MatDialog, public snackbar: MatSnackBar) { }

  ngOnInit() {
    window.scroll(0,0);
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
    this.loading = true;
    this.demandeService.getDemandeEnAttenteAdminOf().subscribe(response => {
      console.log(response);
      this.demandes = response.body;
      this.loading = false;
  }
    );
  }

  validerDemande(id: number, result: Credentials) {
    this.loading = true;
    this.demandeService.configureDemandeWithId(id, result).subscribe(
        data => {
          this.initDemandeEnAttenteAdmin();
          console.log(data);
          this.openSnackbar("Demande validée avec succés! Le demandeur sera notifié de la configuration !", 'OK', { duration: 3000, verticalPosition: 'top' });
        },
        error => {
          console.error(error);
        }
      )
  }


  expirerDemande(id: number) {
    this.loading = true;
    this.demandeService.expirationDemandeWithId(id).subscribe(
      data => {
        this.initDemandeEnAttenteAdmin();
        console.log(data);
        this.openSnackbar("Demande expirée ! Le demandeur sera notifié de l'expiration", 'OK', { duration: 3000, verticalPosition: 'top' });
      },
      error => {
        console.error(error);
      }
    );
  }

  openValidationDialog(id: number) {
    let dialogRef = this.dialog.open(DialogAdminCredentialFormComponent, { data: { username: this.vpnUsername, password: this.vpnPassword } });

    dialogRef.afterClosed().subscribe(result => {
        if (result.username && result.password) {
          this.validerDemande(id, result);
          console.info(result)
        } else {
          console.log("Annulation")
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
