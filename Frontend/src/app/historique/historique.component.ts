import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { ActivatedRoute } from '@angular/router';
import { Demande } from '../models/demande.model';
import { MatDialog } from '@angular/material';
import { DemandeDetailComponent } from '../demande-detail/demande-detail.component';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  demandesAcceptees: Demande[] = [];
  demandesRefusees: Demande[] = [];
  demandesCloturees: Demande[] = [];
  demandesExpirees: Demande[] = [];
  loading:boolean = false;
  expire: string;
  isAdmin: boolean = false;
  motCle: String;
  user: User = new User();
  choix = ["id", ];
  selectedWord : String="demandeurUsername";
  words = [
    {value: "demandeurUsername", viewValue: "Demandeur"},
    {value: "beneficiaireUsername", viewValue: "Bénéficiaire"},
    {value: "objet", viewValue: "Objet de la demande"}
  ]

  constructor(private authService: AuthService, private demandeService: DemandeService, private route: ActivatedRoute, private dialog: MatDialog, private _search: SearchService) { 
    this.words =  this._search.words;
  }

  ngOnInit() {

    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        if(user.profil['isAdmin']) {
          console.log("FROM IF ", user)
          this.isAdmin = true;
        }
      }
    )

    this.expire = this.demandeService.STATUS[4]
    let username = this.route.snapshot.paramMap.get('username');
    
    this.initDemandesAcceptees(username);
    this.initDemandesRefusees(username);
    this.initDemandesCloturees(username);
    this.initDemandesExpirees(username);
  }

  initDemandesAcceptees(username: string) {
    this.loading = true;
    this.demandeService.getDemandeAccepteesOf(username).subscribe(
      responses => {
        this.demandesAcceptees = responses.body.results
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
        this.demandesRefusees = responses.body.results
        this.loading = false;
      },
      error => {
        console.error(error);
      }
    )
  }

  initDemandesExpirees(username: string) {
    this.loading = true;
    this.demandeService.getDemandesExpireesOf(username).subscribe(
      responses => {
        this.demandesExpirees = responses.body.results
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
        this.demandesCloturees = responses.body.results
        this.loading = false;
      },
      error => {
        console.error(error);
      }
    )
  }

  openDetailDialog(demande) {
    let dialogRef = this.dialog.open(DemandeDetailComponent, { data: {demande: demande} } );
    console.log(dialogRef); 
  }
  Search(){
    if(this.motCle != ""){
      this.demandesCloturees = this.demandesCloturees.filter(
        responses=>{
          if(this.selectedWord==="objet"){
          return responses.objet.toLocaleLowerCase().match(this.motCle.toLocaleLowerCase());
          }     else if(this.selectedWord==="demandeurUsername"){
            return responses.demandeur.username.toLocaleLowerCase().match(this.motCle.toLocaleLowerCase());
          } else if(this.selectedWord==="beneficiaireUsername"){
            return responses.beneficiaire.username.toLocaleLowerCase().match(this.motCle.toLocaleLowerCase());
          }
        })
        this.demandesAcceptees = this.demandesAcceptees.filter(
          responses=>{
            return responses.demandeur.username.toLocaleLowerCase().match(this.motCle.toLocaleLowerCase());
        });
        this.demandesRefusees = this.demandesRefusees.filter(
          responses=>{
            return responses.demandeur.username.toLocaleLowerCase().match(this.motCle.toLocaleLowerCase());
        });
        this.demandesExpirees = this.demandesExpirees.filter(
          responses=>{
            return responses.demandeur.username.toLocaleLowerCase().match(this.motCle.toLocaleLowerCase());
        });
    }else if (this.motCle == ""){
      this.ngOnInit();
    }
  }
  clearSearchField(){
    this.motCle="";
    this.ngOnInit();
  }
}

