import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Credentials } from '../validation-admin/validation-admin.component';

@Component({
  selector: '#app-dialog-admin-credential-form',
  templateUrl: './dialog-admin-credential-form.component.html',
  styleUrls: ['./dialog-admin-credential-form.component.css']
})
export class DialogAdminCredentialFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAdminCredentialFormComponent>, @Inject(MAT_DIALOG_DATA) public data: Credentials) { }

  ngOnInit() {
  }

  getCredentials() {
    if (this.data.username && this.data.password) {
      console.log(this.data.username + " " + this.data.password);
      this.dialogRef.close(this.data);
    } else {
      console.error("You must provide username and password")
      this.dialogRef.disableClose
    }
  }
}
