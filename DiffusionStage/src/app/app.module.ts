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
import { LoginComponent } from './NetworkP/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ForbiddenComponent } from './NetworkP/forbidden/forbidden.component';
import { CarnetComponent } from './NetworkP/carnet/carnet.component';
import { HttpClientModule } from '@angular/common/http';
import { PopuputilComponent } from './NetworkP/popuputil/popuputil.component';
import {MatCardModule} from '@angular/material/card';
import { PdfPipe } from './pdf.pipe';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';


import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DevisComponent } from './GestionDevis/devis/devis.component';
import { ConsulterComponent } from './GestionDevis/consulter/consulter.component';
import { PopcondiComponent } from './GestionDevis/popup/popcondi/popcondi.component';
import { PopkitComponent } from './GestionDevis/popup/popkit/popkit.component';
import { PopsocieteComponent } from './GestionDevis/popup/popsociete/popsociete.component';
import { PopchantierComponent } from './GestionDevis/popup/popchantier/popchantier.component';
import { PopmatComponent } from './GestionDevis/popup/popmat/popmat.component';
import { PopcontactComponent } from './GestionDevis/popup/popcontact/popcontact.component';
import { PoptransportComponent } from './GestionDevis/popup/poptransport/poptransport.component';


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
    LoginComponent,
    ForbiddenComponent,
    CarnetComponent,
    PopuputilComponent,
    PdfPipe,
    DevisComponent,
    ConsulterComponent,
    PopcondiComponent,
    PopkitComponent,
    PopsocieteComponent,
    PopchantierComponent,
    PopmatComponent,
    PopcontactComponent,
    PoptransportComponent,
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
    MatAutocompleteModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent],

  entryComponents: [
    PopuputilComponent,
    PopcondiComponent,
    PopkitComponent,
    PopsocieteComponent,
    PopmatComponent,
    PopchantierComponent,
    PopcontactComponent
  ]

  
})
export class AppModule {
  
 }
