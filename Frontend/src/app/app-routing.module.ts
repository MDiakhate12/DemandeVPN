import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeComponent } from './demande/demande.component';
import { ValidationHierarchiqueComponent } from './validation-hierarchique/validation-hierarchique.component';
import { DemandeDetailComponent } from './demande-detail/demande-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidationSecuriteComponent } from './validation-securite/validation-securite.component';
import { ValidationAdminComponent } from './validation-admin/validation-admin.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'nouvelle-demande', component: DemandeComponent, canActivate:[AuthGuard]},
  {path: 'demande/:id', component: DemandeDetailComponent, canActivate:[AuthGuard]},
  {path: 'validation-hierarchique/:username', component:  ValidationHierarchiqueComponent, canActivate:[AuthGuard]},
  {path: 'validation-securite', component:  ValidationSecuriteComponent, canActivate:[AuthGuard]},
  {path: 'validation-admin', component:  ValidationAdminComponent, canActivate:[AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
