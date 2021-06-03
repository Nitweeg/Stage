import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderAdminComponent} from './NetworkP/header-admin/header-admin.component';
import {MatToolbarModule} from  '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {DiffusionComponent} from './NetworkP/diffusion/diffusion.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ScansComponent } from './NetworkP/scans/scans.component';
import { ParametreComponent } from './NetworkP/parametre/parametre.component';
import { UtilisateurComponent } from './NetworkP/utilisateur/utilisateur.component';
import { DataUtilComponent } from './NetworkP/data-util/data-util.component';
import {MatTreeModule} from '@angular/material/tree';
import { MenuParametreComponent } from './NetworkP/menu-parametre/menu-parametre.component';
import { DataParametreComponent } from './NetworkP/data-parametre/data-parametre.component';
import { DataScansComponent } from './NetworkP/data-scans/data-scans.component';
import { LoginComponent } from './NetworkP/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ForbiddenComponent } from './NetworkP/forbidden/forbidden.component';
import { CarnetComponent } from './NetworkP/carnet/carnet.component';
import { HttpClientModule } from '@angular/common/http';
import { PopuputilComponent } from './NetworkP/popuputil/popuputil.component';
import {MatCardModule} from '@angular/material/card';
import { PdfPipe } from './pdf.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderAdminComponent,
    DiffusionComponent,
    ScansComponent,
    ParametreComponent,
    UtilisateurComponent,
    DataUtilComponent,
    MenuParametreComponent,
    DataParametreComponent,
    DataScansComponent,
    LoginComponent,
    ForbiddenComponent,
    CarnetComponent,
    PopuputilComponent,
    PdfPipe,
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
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],

  entryComponents: [
    PopuputilComponent
  ]

  
})
export class AppModule {
  
 }
