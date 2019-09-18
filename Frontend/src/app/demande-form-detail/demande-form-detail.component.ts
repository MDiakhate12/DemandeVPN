import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';
import { User } from '../models/user.model';
import { Protocole } from '../models/protocole.model';
import { Application } from '../models/application.model';
import { GenericService } from '../services/generic.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demande-form-detail',
  templateUrl: './demande-form-detail.component.html',
  styleUrls: ['./demande-form-detail.component.css']
})
export class DemandeFormDetailComponent implements OnInit {

  users: User[] = [];;
  protocoles: Protocole[] = [];;
  applications: Application[] = [];;
  demande: Demande = new Demande();

  constructor(private demandeService: DemandeService, private genericService: GenericService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.genericService.init(this);
     let id = this.route.snapshot.paramMap.get('id');
     this.getDemandeWithId(id);
  }

  getDemandeWithId(id) {
    this.demandeService.getDemandeWithId(id).subscribe(
      response => {
        // this.demande = this.demande.deserialize(data);
        this.demande = response.body;
        console.log(this.demande);
      }
    );
  }
}
