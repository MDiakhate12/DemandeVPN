import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../models/user.model';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogDemandeDetailComponent } from '../dialog-demande-detail/dialog-demande-detail.component';


@Component({
  selector: '#app-demande-en-attente-user',
  templateUrl: './demande-en-attente-user.component.html',
  styleUrls: ['./demande-en-attente-user.component.css']
})
export class DemandeEnAttenteUserComponent implements OnInit {
  user: User;
  demandes: Demande[] = [];
  loading:boolean = false;

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router, private route: ActivatedRoute, private demandeService: DemandeService) { 
    this.user = new User
   }


  ngOnInit() {
    window.scroll(0,0);
    this.initUser();
    let username = this.route.snapshot.paramMap.get('username');
    this.initDemandeEnAttenteUser(username);
    console.log(this.user);
  }

  initUser() {
    this.loading = true;
    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.loading = false;
        console.log(this.user)
      }
    )
  }

  initDemandeEnAttenteUser(username: string) {
    this.demandeService.getDemandeEnAttenteOf(username).subscribe(
      response => {
        this.demandes = response.body
        console.log(this.demandes);
      }
    )
  }

  openDetailDialog(id: number) {
    let dialogRef = this.dialog.open(DialogDemandeDetailComponent, { data: {idDetail: id} } );
    console.log(dialogRef); 
  }
}
