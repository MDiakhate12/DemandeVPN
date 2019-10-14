import { Component, OnInit, Output, EventEmitter, Input, ViewChild, Optional } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';
import { User } from '../models/user.model';
import { Protocole } from '../models/protocole.model';
import { Application } from '../models/application.model';
import { GenericService } from '../services/generic.service';
import { Router, ActivatedRoute } from '@angular/router';  
import { AuthService } from '../services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { DemandeDetailComponent } from '../demande-detail/demande-detail.component';
import { FormControl, Validators } from '@angular/forms';
import { filter, tap, takeUntil, debounceTime, map, delay } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-demande-form',
  templateUrl: './demande-form.component.html',
  styleUrls: ['./demande-form.component.css']
})
export class DemandeFormComponent implements OnInit {

  public isOpen: boolean = false;
  @Output() loading = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Input() id: number;
  localLoading: boolean = false;
  rows = 12;
  formClasses = {}

  users: User[] = [];
  protocoles: Protocole[] = [];
  applications: Application[] = [];
  demande: Demande= new Demande() ;
  user: User = new User();

  objet = new FormControl('', Validators.required);
  beneficiaire = new FormControl('', Validators.required);
  date_expiration = new FormControl('', Validators.required);
  applis = new FormControl('', Validators.required);
  protos = new FormControl('', Validators.required);
  beneficiaireFilteringCtrl = new FormControl('', Validators.required);
  public searching: boolean = false;
  public filteredServerSideBeneficiaires: ReplaySubject<User> = new ReplaySubject<User>(1);
  protected _onDestroy = new Subject<void>();

  validations = [
    this.objet,
    this.beneficiaire,
    this.date_expiration,
    this.applis,
    this.protos,
  ]

  valid: boolean = false;

  @ViewChild('apps', { static: false }) apps;
  @ViewChild('prots', { static: false }) prots;
  motCle: string;
  selectedWord: string;

  constructor(@Optional() public dialogRef: MatDialogRef<DemandeDetailComponent>, private demandeService: DemandeService, private genericService: GenericService, private router: Router, private authService: AuthService, private dialog: MatDialog, private snackbar: MatSnackBar, private route: ActivatedRoute) {
    console.log(this.applications);
    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
      }
    );

  }

  ngOnInit() {
    this.genericService.init(this);
    let id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.demandeService.getDemandeWithId(this.id).subscribe(
        response => {
          this.demande = response.body
        }
      )
      this.rows = 5;
      console.log("THERE IS ID", this.id)
      this.formClasses = {
        'test': this.id
      }
    } else if (id) {

      this.demandeService.getDemandeWithId(parseInt(id)).subscribe(
        response => this.demande = response.body
      )
      this.formClasses = {
        'col-md-6': true,
        'large-page': true
      }
    }
    this.beneficiaireFilteringCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(search => {
          if (!this.users){
            return [];
          }
          return this.users.filter(
            user => user.username.toLowerCase().indexOf(search) > -1);
        }),
        delay(500)
      )
      .subscribe(filteredUsers => {
        this.searching = false;
        this.filteredServerSideBeneficiaires.next(filteredUsers);
      },
      error => {
        this.searching = false;
      
      });

  }

  onSubmit(demande) {
    this.validations.forEach(
      validation => {
        if (validation.valid == false) {
          return this.valid = false;
        }
        return this.valid = true
      }
    )

    if (this.valid) {
      if (this.id) {
        console.log(demande)

        console.log("FROM SUBMIT WITH ID", this.id)
        this.updateDemande(demande)
      } else {
        this.loading.emit(true);
        this.demandeService.sendDemande(this.demande).subscribe(
          response => {
            this.demande = response.body;
            console.log(this.demande.id);
            this.router.navigate(['/demande', this.demande.id]);
            this.loading.emit(false);
          },
          error => {
            console.error('ERREUR : ' + error);
          }
        );
      }
    }
  }

  updateDemande(demande: Demande) {
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(
      choice => {
        if (choice) {
          this.localLoading = true;
          demande.id = this.id | this.demande.id;
          this.demandeService.updateDemande(demande).subscribe(
            data => {
              console.log(data)
              this.snackbar.open("Demande " + this.id + " modifiée avec succés !", 'OK');
              this.updated.emit(demande);
              this.dialogRef.close();
              this.localLoading = false;
            }
          )
        }
        return;
      }
    )
  }

  getErrorMessage(){
    return "Ce champs est obligatoire"
  }

Search(){
    
  // this._search.Search(this.motCle, this.selectedWord, this.demandes)
  if(this.motCle != ""){
        return this.demande.beneficiaire.username.toLocaleLowerCase().match(this.motCle.toLocaleLowerCase());
        };     
  

}
}