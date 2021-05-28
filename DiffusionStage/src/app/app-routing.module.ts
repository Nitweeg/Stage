import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarnetComponent } from './carnet/carnet.component';
import { DiffusionComponent } from './diffusion/diffusion.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {HeaderAdminComponent} from './header-admin/header-admin.component';
import { LoginComponent } from './login/login.component';
import { LogsComponent } from './logs/logs.component';
import { ParametreComponent } from './parametre/parametre.component';
import { RetourComponent } from './retour/retour.component';
import { ScansComponent } from './scans/scans.component';
import { SecuriteGuard } from './securite.guard';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

const routes: Routes = [
  { path: 'index', component: HeaderAdminComponent,},
  { path: 'diffusion', component: DiffusionComponent},
  { path: 'scans', component: ScansComponent},
  { path: 'retour', component: RetourComponent},
  { path: 'parametre', component: ParametreComponent,canActivate:[SecuriteGuard]},
  { path: 'logs', component: LogsComponent,canActivate:[SecuriteGuard]},
  { path: 'utilisateur', component: UtilisateurComponent,canActivate:[SecuriteGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'carnet', component: CarnetComponent, canActivate:[SecuriteGuard]},
  { path: 'forbidden', component: ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
