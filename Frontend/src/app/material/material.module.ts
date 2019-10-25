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
  MatRippleModule,
  MatRadioModule
} from '@angular/material';

import { MatBadgeModule } from '@angular/material/badge'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
  MatTableModule,
  MatRippleModule,
  MatBadgeModule,
  MatRadioModule,
  NgxMatSelectSearchModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
