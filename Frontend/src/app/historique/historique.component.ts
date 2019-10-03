import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { ActivatedRoute } from '@angular/router';
import { Demande } from '../models/demande.model';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  demandesAcceptees: Demande[] = [];
  demandesRefusees: Demande[] = [];

  constructor(private demandeService: DemandeService, private route: ActivatedRoute) { }

  ngOnInit() {

    let username = this.route.snapshot.paramMap.get('username');
    this.initDemandesAcceptees(username);
    this.initDemandesRefusees(username);
  }

  initDemandesAcceptees(username: string) {
    this.demandeService.getDemandeAccepteesOf(username).subscribe(
      responses => {
        console.log(responses.body)
        this.demandesAcceptees = responses.body
      },
      error => {
        console.error(error);
      }
    )
  }

  initDemandesRefusees(username: string) {
    this.demandeService.getDemandeRefuseesOf(username).subscribe(
      responses => {
        console.log(responses.body)
        this.demandesRefusees = responses.body
      },
      error => {
        console.error(error);
      }
    )
  }

}

