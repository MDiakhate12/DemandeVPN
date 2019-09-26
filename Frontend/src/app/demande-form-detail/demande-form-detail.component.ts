import { Component, OnInit, Input } from '@angular/core';
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
  demande;

  @Input() id; ;
  cardClasses = { }; 

  constructor(private demandeService: DemandeService, private genericService: GenericService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.genericService.init(this);
     let id = this.route.snapshot.paramMap.get('id');

     if(id) {
      this.getDemandeWithId(id);
      this.cardClasses = {'col-sm-6': id};
    } else {
      this.getDemandeWithId(this.id);
      this.cardClasses = {
        'col-sm-12': !id,
    };
     }
     
  }

  getDemandeWithId(id) {
    this.demandeService.getDemandeWithId(id).subscribe(
      async response => {
        let demandeBody = Promise.resolve(response.body);
        this.demande = await demandeBody;
        console.log(this.demande);
      }
    );
  }
}
