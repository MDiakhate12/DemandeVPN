import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: '#app-dialog-demande-detail',
  templateUrl: './dialog-demande-detail.component.html',
  styleUrls: ['./dialog-demande-detail.component.css']
})
export class DialogDemandeDetailComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
