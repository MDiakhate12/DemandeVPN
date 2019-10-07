import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { HistoriqueComponent } from './historique/historique.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DashboardSecuriteComponent } from './dashboard-securite/dashboard-securite.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { HistoriqueSecuriteComponent } from './historique-securite/historique-securite.component';
import { DialogDemandeHistoriqueComponent } from './dialog-demande-historique/dialog-demande-historique.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingComponent } from './loading/loading.component';
import { ValidationVideComponent } from './validation-vide/validation-vide.component';
import { DialogAdminCredentialFormComponent } from './dialog-admin-credential-form/dialog-admin-credential-form.component';
import { DemandeFormComponent } from './demande-form/demande-form.component';
import { DialogMotifRefusComponent } from './dialog-motif-refus/dialog-motif-refus.component';

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
    HistoriqueComponent,
    DashboardUserComponent,
    DashboardSecuriteComponent,
    DashboardAdminComponent,
    HistoriqueSecuriteComponent,
    DialogDemandeHistoriqueComponent,
    PageNotFoundComponent,
    LoadingComponent,
    ValidationVideComponent,
    DialogAdminCredentialFormComponent,
    DemandeFormComponent,
    DialogMotifRefusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [DialogComponent, DialogErrorComponent, DialogDemandeHistoriqueComponent, DialogAdminCredentialFormComponent, DemandeDetailComponent, DialogMotifRefusComponent],
  providers: [DemandeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
