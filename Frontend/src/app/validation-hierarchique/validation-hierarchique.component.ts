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
import { DialogMotifRefusComponent } from '../dialog-motif-refus/dialog-motif-refus.component';

@Component({
  selector: '#validation-hierarchique',
  templateUrl: './validation-hierarchique.component.html',
  styleUrls: ['./validation-hierarchique.component.css']
})
export class ValidationHierarchiqueComponent implements OnInit {

  panelOpenState = true;
  step = 0;

  users: User[] = [];
  motif: string = '';
  ;
  protocoles: Protocole[] = [];;
  applications: Application[] = [];;
  demandes: Demande[] = new Array<Demande>();
  username: string;
  loading: boolean = false;

  constructor(private demandeService: DemandeService, private genericService: GenericService, private router: ActivatedRoute, public dialog: MatDialog, public snackbar: MatSnackBar) { }

  ngOnInit() {
    window.scroll(0, 0);
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
    this.loading = true;
    this.username = this.router.snapshot.paramMap.get("username");
    this.demandeService.getDemandeEnAttenteHierarchiqueOf(this.username).subscribe(response => {
      this.demandes = response.body;
      this.loading = false;
    }
    );
  }

  validerDemande(id: number) {
    this.loading = true;
    this.demandeService.acceptDemandeWithId(id).subscribe(
      data => {
        this.initDemandeEnAttenteHierarchique();
        console.log(data);
        this.openSnackbar("Demande validée avec succés! Envoi immédiat à l'admin sécurité", 'OK', { duration: 3000, verticalPosition: 'top' });
        this.loading = false;
      },
      error => {
        console.error(error);
      }
    )
  }


  refuserDemande(id: number, motif: string) {
    this.loading = true;
    this.demandeService.rejectDemandeWithId(id, motif).subscribe(
      data => {
        this.initDemandeEnAttenteHierarchique();
        console.log(data);
        this.openSnackbar("Demande refusée ! Le demandeur sera notifié du refus", 'OK', { duration: 3000, verticalPosition: 'top' });
        this.loading = false;
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
      } else {
        return;
      }
    }
    )
  }

  openDenialDialog(id: number) {
    let dialogRef = this.dialog.open(DialogMotifRefusComponent, { data: { motif: this.motif } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.motif) {
        this.refuserDemande(id, result.motif);
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
