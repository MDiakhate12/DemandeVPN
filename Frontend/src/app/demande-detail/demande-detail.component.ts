import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatTabGroup } from '@angular/material';
import { DemandeService } from '../services/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from '../models/demande.model';


@Component({
  selector: '#app-demande-detail',
  templateUrl: './demande-detail.component.html',
  styleUrls: ['./demande-detail.component.css']
})
export class DemandeDetailComponent implements OnInit {

  isDialog: boolean = false;
  loading: boolean = false;
  dialogClass = {}
  tabGroupClasses = {}
  demande;
  statuses = this.demandeService.STATUS;
  index: number;

  @ViewChild('tabGroup', { static: false }) tabGroup: MatTabGroup;
  updated: Demande = null;
  deleted: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private demandeService: DemandeService, private route: ActivatedRoute) { }

  ngOnInit() {

    if (this.data) {
        this.tabGroupClasses = {
          'dialog-tab-group': true,
        }

      this.dialogClass = { 'detail-dialog': true }
    } else {
      this.dialogClass = { 'detail': true }
    }
  }

  slideTo(e) {
    console.log(e)
    console.log(this.tabGroup.selectedIndex)
    this.tabGroup.selectedIndex = parseInt(e)
  }

  emitModalClose(e: Demande) {
    this.updated = e;
  }

  fireInitDemande(e) {
    this.deleted = e;
  }
}
