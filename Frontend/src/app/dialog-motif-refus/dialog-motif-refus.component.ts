import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dialog-motif-refus',
  templateUrl: './dialog-motif-refus.component.html',
  styleUrls: ['./dialog-motif-refus.component.css']
})
export class DialogMotifRefusComponent implements OnInit {

  motif = new FormControl('', [Validators.minLength(10), Validators.required]);

  constructor(public dialogRef: MatDialogRef<DialogMotifRefusComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  getMotif(data) {
    console.log(this.motif.valid)
    if (data.motif && this.motif.valid) {
      console.log(data)
      this.dialogRef.close(data)
    } else {
      console.log(this.motif.errors)
      console.error("You must provide a refusal reason")
    }
  }


  getErrorMessage() {
    if(this.motif.hasError('minlength'))
      return  'Entrez au moins ' + this.motif.getError('minlength').requiredLength +' caractères'
    if(this.motif.hasError('required'))
      return 'Vous devez donner un motifs de refus au demandeur'
  }


}
