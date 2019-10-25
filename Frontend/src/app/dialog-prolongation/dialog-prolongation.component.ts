import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-prolongation',
  templateUrl: './dialog-prolongation.component.html',
  styleUrls: ['./dialog-prolongation.component.css']
})
export class DialogProlongationComponent implements OnInit {
  motif = new FormControl('', [Validators.minLength(10), Validators.required]);

  constructor(public dialogRef: MatDialogRef<DialogProlongationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  getMotif(data) {
    console.log(this.motif.valid)
    if (data.motif && this.motif.valid) {
      console.log(data)
      // this.dialogRef.close(data)
    } else {
      console.log(this.motif.errors)
      console.error("You must provide a refusal reason")
    }
  }

  getErrorMessage() {
    if(this.motif.hasError('minlength'))
      return  'Entrez au moins ' + this.motif.getError('minlength').requiredLength +' caractères'
    if(this.motif.hasError('required'))
      return 'Vous devez donner un motif de prolongation'
  }

}
