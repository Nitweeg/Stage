import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarnetComponent } from './NetworkP/carnet/carnet.component';
import { DiffusionComponent } from './NetworkP/diffusion/diffusion.component';
import { ForbiddenComponent } from './NetworkP/forbidden/forbidden.component';
import {HeaderAdminComponent} from './NetworkP/header-admin/header-admin.component';
import { LoginComponent } from './NetworkP/login/login.component';
import { ParametreComponent } from './NetworkP/parametre/parametre.component';
import { ScansComponent } from './NetworkP/scans/scans.component';
import { SecuriteGuard } from './securite.guard';
import { UtilisateurComponent } from './NetworkP/utilisateur/utilisateur.component';
import { DevisComponent } from './GestionDevis/devis/devis.component';
import { ConsulterComponent } from './GestionDevis/consulter/consulter.component';

const routes: Routes = [
  { path: 'index', component: HeaderAdminComponent,canActivate:[SecuriteGuard]},
  { path: 'diffusion', component: DiffusionComponent},
  { path: 'scans', component: ScansComponent,canActivate:[SecuriteGuard]},
  { path: 'parametre', component: ParametreComponent,canActivate:[SecuriteGuard]},
  { path: 'utilisateur', component: UtilisateurComponent,canActivate:[SecuriteGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'carnet', component: CarnetComponent, canActivate:[SecuriteGuard]},
  { path: 'forbidden', component: ForbiddenComponent},


  { path: 'devis',component: DevisComponent},

  { path: 'consulter',component: ConsulterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
