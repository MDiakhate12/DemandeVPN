import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';
import { MatDialog } from '@angular/material';
import { DemandeDetailComponent } from '../demande-detail/demande-detail.component';
import { SearchService } from '../search.service';


@Component({
  selector: '#app-demande-en-attente-user',
  templateUrl: './demande-en-attente-user.component.html',
  styleUrls: ['./demande-en-attente-user.component.css']
})
export class DemandeEnAttenteUserComponent implements OnInit, OnChanges {
  ngOnChanges() {
    let username = this.route.snapshot.paramMap.get('username');
    this.initDemandeEnAttenteUser(username);
  }
  user: User;
  demandes: Demande[] = [];
  loading: boolean = false;
  afterUpdate = {}
  motCle: String;
  selectedWord : String="demandeurUsername";
  choix: String;
  words: any[];




  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router, private route: ActivatedRoute, private demandeService: DemandeService, private _search: SearchService) {
    this.user = new User
    this.words =  this._search.words;
    
  }
  

  ngOnInit() {
    window.scroll(0, 0);
    this.initUser();
    let username = this.route.snapshot.paramMap.get('username');
    this.initDemandeEnAttenteUser(username);
    console.log(this.user);
  }

  initUser() {
    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        console.log(this.user)
      }
    )
  }

  initDemandeEnAttenteUser(username: string) {
    this.loading = false;
    this.demandeService.getDemandeEnAttenteOf(username).subscribe(
      response => {
        this.demandes = response.body.results
        console.log(this.demandes);
        this.loading = false;
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
            this.initDemandeEnAttenteUser(username)
          }, 1000)
          this.loading = false
        } else {
          this.loading = false
          return
        }
      }
    )
  }
  onWordSelection(){
    if(this.selectedWord==="beneficiaireUsername"){
      console.log("FROM BENEFICIARE")
      console.log("Selected word : "+this.selectedWord)
    
  }}
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
      this.initDemandeEnAttenteUser(username);
    }
  }
  clearSearchField(){
    this.motCle="";
    this.ngOnInit();
  }

}
