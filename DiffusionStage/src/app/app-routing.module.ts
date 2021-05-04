import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiffusionComponent } from './diffusion/diffusion.component';
import {HeaderAdminComponent} from './header-admin/header-admin.component';
import { LogsComponent } from './logs/logs.component';
import { ParametreComponent } from './parametre/parametre.component';
import { RetourComponent } from './retour/retour.component';
import { ScansComponent } from './scans/scans.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

const routes: Routes = [
  { path: 'index', component: HeaderAdminComponent,},
  { path: 'diffusion', component: DiffusionComponent},
  { path: 'scans', component: ScansComponent},
  { path: 'retour', component: RetourComponent},
  { path: 'parametre', component: ParametreComponent},
  { path: 'logs', component: LogsComponent},
  { path: 'utilisateur', component: UtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
