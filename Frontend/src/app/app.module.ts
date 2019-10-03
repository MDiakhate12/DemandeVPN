import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { DemandeComponent } from './demande/demande.component';
import { DemandeService } from './services/demande.service';
import { HttpClientModule } from '@angular/common/http';
import { ValidationHierarchiqueComponent } from './validation-hierarchique/validation-hierarchique.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { DemandeDetailComponent } from './demande-detail/demande-detail.component';
import { DemandeFormDetailComponent } from './demande-form-detail/demande-form-detail.component';
import { DemandeValidationDetailComponent } from './demande-validation-detail/demande-validation-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidationSecuriteComponent } from './validation-securite/validation-securite.component';
import { ValidationAdminComponent } from './validation-admin/validation-admin.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { DemandeEnAttenteUserComponent } from './demande-en-attente-user/demande-en-attente-user.component';
import { DialogDemandeDetailComponent } from './dialog-demande-detail/dialog-demande-detail.component';
import { HistoriqueComponent } from './historique/historique.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DemandeComponent,
    ValidationHierarchiqueComponent,
    NavbarComponent,
    LoginComponent,
    DemandeDetailComponent,
    DemandeFormDetailComponent,
    DemandeValidationDetailComponent,
    DashboardComponent,
    ValidationSecuriteComponent,
    ValidationAdminComponent,
    DialogComponent,
    DialogErrorComponent,
    DemandeEnAttenteUserComponent,
    DialogDemandeDetailComponent,
    HistoriqueComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  entryComponents: [DialogComponent, DialogDemandeDetailComponent, DialogErrorComponent],
  providers: [DemandeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
