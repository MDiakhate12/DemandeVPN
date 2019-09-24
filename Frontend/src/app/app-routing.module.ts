import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeComponent } from './demande/demande.component';
import { ValidationHierarchiqueComponent } from './validation-hierarchique/validation-hierarchique.component';
import { DemandeDetailComponent } from './demande-detail/demande-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidationSecuriteComponent } from './validation-securite/validation-securite.component';
import { ValidationAdminComponent } from './validation-admin/validation-admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { DemandeEnAttenteUserComponent } from './demande-en-attente-user/demande-en-attente-user.component';
import { SecuriteGuard } from './guards/securite.guard';
import { AdminGuard } from './guards/admin.guard';
import { HierarchieGuard } from './guards/hierarchie.guard';
import { HistoriqueComponent } from './historique/historique.component';

const routes: Routes = [
  // {path: '', component: DashboardComponent, pathMatch: 'full'},
  
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},

  {path: 'nouvelle-demande', component: DemandeComponent, canActivate: [AuthGuard]},
  {path: 'demande/:id', component: DemandeDetailComponent, canActivate: [AuthGuard]},
  {path: 'validation-hierarchique/:username', component:  ValidationHierarchiqueComponent, canActivate: [AuthGuard, HierarchieGuard]},
  {path: 'validation-securite', component:  ValidationSecuriteComponent, canActivate: [AuthGuard, SecuriteGuard]},
  {path: 'validation-admin', component:  ValidationAdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'demandes/:username', component: LoginComponent},
  {path: 'demandes/en-attente/:username', component: DemandeEnAttenteUserComponent},
  
  {path: 'demandes/historique/:username', component: HistoriqueComponent},
  {path: 'demandes/notifications/:username', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
