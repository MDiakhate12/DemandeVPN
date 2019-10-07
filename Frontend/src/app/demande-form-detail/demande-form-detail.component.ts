import { Component, OnInit, Input, Output, EventEmitter, Optional } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { User } from '../models/user.model';
import { Protocole } from '../models/protocole.model';
import { Application } from '../models/application.model';
import { GenericService } from '../services/generic.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DemandeDetailComponent } from '../demande-detail/demande-detail.component';

@Component({
  selector: 'app-demande-form-detail',
  templateUrl: './demande-form-detail.component.html',
  styleUrls: ['./demande-form-detail.component.css']
})
export class DemandeFormDetailComponent implements OnInit {


  @Output() slide = new EventEmitter();
  @Output() deleted = new EventEmitter();

  users: User[] = [];
  protocoles: Protocole[] = [];
  applications: Application[] = [];
  demande;
  statuses = this.demandeService.STATUS;
  loading: boolean = false;


  @Input() id;;
  cardClasses = {};

  constructor(@Optional() public dialogRef: MatDialogRef<DemandeDetailComponent> , private demandeService: DemandeService, private genericService: GenericService, private route: ActivatedRoute, private dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.genericService.init(this);
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getDemandeWithId(id);
      this.cardClasses = { 'col-sm-6': id };
    } else {
      this.getDemandeWithId(this.id);
      this.cardClasses = {
        'small-card': true,
        'col-sm-12': !id,
      };
    }

  }

  getDemandeWithId(id) {
    this.loading = true;
    this.demandeService.getDemandeWithId(id).subscribe(
      async response => {
        let demandeBody = Promise.resolve(response.body);
        this.demande = await demandeBody;
        console.log(this.demande);
        this.loading = false;
      }
    );
  }

  fireSlideToUpdate() {
    this.slide.emit('3');
  }

  deleteDemande(id: number) {
    this.loading = true;
    this.demandeService.deleteDemandeWithId(id).subscribe(
      data => {
        console.log(data);
        this.deleted.emit(true);
        this.dialogRef.close();
        this.openSnackbar("Demande annulée ! Elle sera retirée de la liste d'attente", 'OK', { duration: 3000, verticalPosition: 'top' });
        this.loading = false;
      },
      error => {
        console.error(error);
      }
    )
  }


  openDeleteDialog(id: number) {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(choice => {
      console.log(choice);
      if (choice === 'true') {
        this.deleteDemande(id);
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
