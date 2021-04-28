import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiffusionComponent } from './diffusion/diffusion.component';
import {HeaderAdminComponent} from './header-admin/header-admin.component';

const routes: Routes = [
  { path: 'index', component: HeaderAdminComponent,},
  { path: 'diffusion', component: DiffusionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
