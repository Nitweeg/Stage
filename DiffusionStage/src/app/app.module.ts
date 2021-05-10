import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderAdminComponent} from './header-admin/header-admin.component';
import {MatToolbarModule} from  '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {DiffusionComponent} from './diffusion/diffusion.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {DataTableComponent} from './data-table/data-table.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LogsComponent } from './logs/logs.component';
import { ScansComponent } from './scans/scans.component';
import { RetourComponent } from './retour/retour.component';
import { ParametreComponent } from './parametre/parametre.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { SearchComponent } from './search/search.component';
import { DataUtilComponent } from './data-util/data-util.component';
import {MatTreeModule} from '@angular/material/tree';
import { MenuParametreComponent } from './menu-parametre/menu-parametre.component';
import { DataParametreComponent } from './data-parametre/data-parametre.component';
import { DataScansComponent } from './data-scans/data-scans.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderAdminComponent,
    DiffusionComponent,
    DataTableComponent,
    LogsComponent,
    ScansComponent,
    RetourComponent,
    ParametreComponent,
    UtilisateurComponent,
    SearchComponent,
    DataUtilComponent,
    MenuParametreComponent,
    DataParametreComponent,
    DataScansComponent,
  ],
  imports: [
    MatGridListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    MatExpansionModule,
    MatDividerModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTreeModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
