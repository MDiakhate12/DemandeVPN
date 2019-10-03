import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule, 
  MatMenuModule, 
  MatProgressSpinnerModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatDatepickerModule, 
  MatNativeDateModule, 
  MatSelectModule, 
  MatGridListModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatCardModule,
  MatExpansionModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatDividerModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatGridListModule, 
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatExpansionModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatDividerModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
