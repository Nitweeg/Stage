import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderAdminComponent} from './header-admin/header-admin.component';

const routes: Routes = [
  { path: '', component: HeaderAdminComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
