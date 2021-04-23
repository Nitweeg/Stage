import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderAdminComponent} from './header-admin/header-admin.component';
import {ScansComponent} from './scans/scans.component'

const routes: Routes = [
  { path: 'index', component: HeaderAdminComponent,},
  { path: 'scans', component: ScansComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
