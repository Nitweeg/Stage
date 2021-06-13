import { Component, Inject, OnInit, PLATFORM_INITIALIZER } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopcondiComponent } from '../popup/popcondi/popcondi.component';
import { PopkitComponent } from '../popup/popkit/popkit.component';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as rxjsOps from 'rxjs/operators';
import { RestApiService } from '../shared/rest-api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PopsocieteComponent } from '../popup/popsociete/popsociete.component';
import { PopchantierComponent } from '../popup/popchantier/popchantier.component';
import { Condi } from '../shared/condi';
import { PopcontactComponent } from '../popup/popcontact/popcontact.component';
import { PoptransportComponent } from '../popup/poptransport/poptransport.component';
import { PopmatComponent } from '../popup/popmat/popmat.component';
import { Kit } from '../shared/kit';
import { Societe } from '../shared/societe';
import { Chantier } from '../shared/chantier';
import { Contact } from '../shared/contact';
import { ContactSo } from '../shared/contact-so';
import { DevisServiceService } from '../shared/devis-service.service';
import { Devis } from '../shared/devis';
import { DevisChan } from '../shared/devis-chan';
import { Consommabledevis } from '../shared/consommabledevis';
import { Locationdevis } from '../shared/locationdevis';
import { Modevis } from '../shared/modevis';
import { Transportdevis } from '../shared/transportdevis';
import { AuthService } from 'src/app/NetworkP/service/auth.service';

/* Données pour les pop up */

export interface CondiData {
  condi: CONDI;
  conditions: Condi[];
}

/**************************** */

/* Données pour les tables */

interface Prestation {
  reference: string;
  nom: string;
  'prix/u': number;
  nombre: number;
  remise: number;
  marge: number;
  total: number;
  observation: string;
}

let PRESTATION_INFO = [
  {reference : '', nom: '', 'prix/u': 0, nombre : 0, remise: 0, marge: 0, total: 0, observation: ''},
];

interface Location {
  reference: string;
  nom: string;
  'prix/cal': number;
  'prix/mois': number;
  nombre: number;
  duree: number;
  typeDuree: string;
  remise: number;
  marge: number;
  total: number;
  observation: string;
}

let LOCATION_INFO = [
  // tslint:disable-next-line: max-line-length
  {reference : '', nom: '', 'prix/cal': 0, 'prix/mois': 0, nombre : 0, duree: 0, typeDuree: '', remise: 0, marge: 0, total: 0, observation: ''},
];

interface Mo {
  designation: string;
  montantHoraire: number;
  temps: number;
  nombrePersonnes: number;
  remise: number;
  marge: number;
  total: number;
}

let MO_INFO = [
  {designation : '', montantHoraire : 50, temps: 0, nombrePersonnes: 0, remise: 0, marge: 0, total: 0},
];

interface Transport {
  type: string;
  zone: number;
  montant: number;
  remise: number;
  marge: number;
  observation: string;
}

let TRANSPORT_INFO = [
  {type : '', zone : 0, montant : 0, remise: 0, marge: 0, observation: ''},
];

interface CONDI {
  description: string;
  position: number;
}

let CONDI_INFO: CONDI[] = [
  {position: 1, description: 'Ajouter'},
];


/* ---------------------- */


@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit{

  // Donnée de l'utilisateur
  nomEmetteur = 'Bois';
  prenomEmetteur = 'Paul';

  // Données des societes
  Societe: any;
  Societes: any = [];
  soci: any;
  siret = '';
  adresseS = '';
  villeS = '';
  cpS = '';
  telS = '';
  tva = 1.2;

  // Données des chantiers
  Chantier: any;
  Chantiers: any = [];
  idChantier = 0;
  chan: any;
  adresseC = '';
  villeC = '';
  cpC = '';
  margeC = 10;

  // Données des contacts
  Contacts: any = [];
  idContact = 0;
  idContacts: number[] = [];
  ContactsSo: any = [];
  nomContact = '';
  telContact = '';
  mailContact = '';

  // Données conditions
  Conditions: any = [];
  listCondi: string[] = [];
  lastcondi = CONDI_INFO[CONDI_INFO.length - 1].position;
  condi: CONDI = {position: this.lastcondi + 1, description: ''};

  // Données pour les matériels
  Materiels: any = [];
  NomMateriels: string[] = [];
  currentElement!: any;

  // Données pour les produits
  Produits: any = [];

  // Données pour les kits
  Kits: any = [];
  idKit = 0;
  KitsContenu: any = [];
  NomKits: any = [];

  // Données pour les transports
  Transports: any = [];

  // Données pour la barre de recherche de societe
  ControlSociete = new FormControl();
  optionsSociete: string[] = [];
  filteredOptionsS!: Observable<string[]>;

  // Données pour la barre de recherche de chantier
  ControlChantier = new FormControl();
  optionsChantier: string[] = [];
  filteredOptionsC!: Observable<string[]>;

  // Données pour la barre de recherche de chantier
  ControlContact = new FormControl();
  optionsContact: string[] = [];
  filteredOptionsCo!: Observable<string[]>;

  // Données pour la barre de recherche de matériel et produit
  public stateInputChange$: Subject<string> = new Subject<string>();
  optionsM: string[] = [];
  listElement: string[] = [];
  filteredOptionsM!: Observable<string[]>;

  // Données pur la barre de recherche de ref
  optionsRef: string[] = [];
  filteredOptionsRef!: Observable<string[]>;

  // Données pur la barre de recherche de transport
  optionsT: string[] = [];
  optionsZone: string[] = [];
  filteredOptionsT!: Observable<string[]>;
  filteredOptionsZone!: Observable<string[]>;

  // Booleen qui passent en true pour montrer les infos de la societe/ du chantier et false pour les cacher
  showInfosSociete = false;
  showInfosChantier = false;

  // Données du devis
  Devis: any = [];
  modifDevis = false;
  dateAct = new Date();
  idDevis = '';
  nbDevis = 1;
  listIdDevis: any = [];
  objet = '';
  date = '';
  dateLiv = '';
  delais = '';
  condiPrix = '';
  condiRegle = '';
  delaisExec = '';

  // label tableaux
  cptP = 0;
  cptL = 0;
  cptM = 0;
  cptT = 0;
  btnPrestation = true;
  btnLocation = true;
  btnMo = true;
  btnTransport = true;




  constructor(private matDialog: MatDialog, public restApi: RestApiService, public devisServ: DevisServiceService, public auth: AuthService) {}



  selection = new SelectionModel<CONDI>(true, []);


/* Données pour les table */
ColPres: string[] = ['reference', 'nom', 'prix/u', 'nombre', 'remise', 'marge', 'total', 'observation'];
ColLoc: string[] = ['reference', 'nom', 'prix/cal', 'prix/mois', 'nombre', 'duree', 'typeDuree', 'remise', 'marge', 'total', 'observation'];
ColMo: string[] = ['designation', 'montantHoraire', 'temps', 'nombrePersonnes', 'remise', 'marge', 'total'];
ColTr: string[] = ['type', 'zone', 'montant', 'remise', 'marge', 'observation'];
ColCondi: string[] = ['select', 'description'];
presSource = new MatTableDataSource<Prestation>(PRESTATION_INFO);
locSource = new MatTableDataSource<Location>(LOCATION_INFO);
moSource = new MatTableDataSource<Mo>(MO_INFO);
trSource = new MatTableDataSource<Transport>(TRANSPORT_INFO);
condiSource = new MatTableDataSource<CONDI>(CONDI_INFO);
/* ----------------------- */

// Les trois fonctions en dessous sont pour les checkbox des conditions spécifiques
// tslint:disable-next-line: typedef
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.condiSource.data.length;
  return numSelected === numRows;
}

// tslint:disable-next-line: typedef
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.condiSource.data.forEach(row => this.selection.select(row));
}

checkboxLabel(row?: CONDI): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}

// Permet de cacher les boutons selon la condition
// tslint:disable-next-line: typedef
getCondi(row?: CONDI, e?: any){
  if (e.checked){
    for ( let co of this.Conditions){
      if (co['NomCondi'] === row?.description){
        if (co['Description'] !== ''){
          this.listCondi.push(co['Description']);
          console.log('ajout : ' + this.listCondi);
        }
        if (co['Prestation'] === 1){
          this.btnPrestation = false;
          this.cptP = this.cptP + 1;
        }
        if (co['Location'] === 1){
          this.btnLocation = false;
          this.cptL = this.cptL + 1;
        }
        if (co['Mo'] === 1){
          this.btnMo = false;
          this.cptM = this.cptM + 1;
        }
        if (co['Transport'] === 1){
          this.btnTransport = false;
          this.cptT = this.cptT + 1;
        }
      }
    }
  }
  else {
    for ( let co of this.Conditions){
      if (co['NomCondi'] === row?.description){
        if (co['Description'] !== ''){
          let index = this.listCondi.indexOf(co['Description']);
          this.listCondi.splice(index, 1);
          console.log('delete : ' + this.listCondi);
        }
        if (co['Prestation'] === 1 ){
          if ( this.cptP === 1){
            this.cptP = this.cptP - 1;
            this.btnPrestation = true;
          }
          else {
            this.cptP = this.cptP - 1;
          }
        }
        if (co['Location'] === 1){
          if ( this.cptL === 1){
            this.cptL = this.cptL - 1;
            this.btnLocation = true;
          }
          else {
            this.cptL = this.cptL - 1;
          }
        }
        if (co['Mo'] === 1){
          if ( this.cptM === 1){
            this.cptM = this.cptM - 1;
            this.btnMo = true;
          }
          else {
            this.cptM = this.cptM - 1;
          }
        }
        if (co['Transport'] === 1){
          if ( this.cptT === 1){
            this.cptT = this.cptT - 1;
            this.btnTransport = true;
          }
          else {
            this.cptT = this.cptT - 1;
          }
        }
      }
    }
  }
}

/** Pour les pop up d'ajout */

// tslint:disable-next-line: typedef
openDialogSociete() {
  const dialogConfig = new MatDialogConfig();
  const dialogRef = this.matDialog.open(PopsocieteComponent, {
    data: { nomS: this.soci, societes: this.Societes}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
    this.soci = result.nomS;
    this.Societes = result.societes;
    this.optionsSociete.push(this.soci);
    }
  });
}

// tslint:disable-next-line: typedef
openDialogChantier() {
  const dialogConfig = new MatDialogConfig();
  const dialogRef = this.matDialog.open(PopchantierComponent, {
    data: { nomS: this.soci, chantiers: this.Chantiers, nomC: this.chan }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
    this.chan = result.nomC;
    this.Chantiers = result.chantiers;
    this.optionsChantier.push(this.chan);
    }
  });
}

// tslint:disable-next-line: typedef
openDialogCondi() {
  const dialogConfig = new MatDialogConfig();
  const dialogRef = this.matDialog.open(PopcondiComponent, {
    data: {condi: this.condi, conditions: this.Conditions}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
    CONDI_INFO.push(result.condi);
    this.Conditions = result.conditions;
    this.lastcondi = CONDI_INFO[CONDI_INFO.length - 1].position;
    this.condi.position = this.lastcondi;
    this.condiSource.data = CONDI_INFO;
    }
  });
}

// tslint:disable-next-line: typedef
openDialogKit() {
  const dialogConfig = new MatDialogConfig();
  const dialogRef = this.matDialog.open(PopkitComponent, {
    data: {listEle: this.listElement, listOption: this.optionsM, idK: this.idKit, listKitC: this.KitsContenu, kit: Kit}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
    this.Kits.push(result.kit);
    this.NomKits.push(result.kit['NomKit']);
    this.KitsContenu = result.listKitC;
    this.listElement = result.listElement;
    this.optionsM = result.listOption;
    }
  });
}

// tslint:disable-next-line: typedef
openDialogContact() {
  const dialogConfig = new MatDialogConfig();
  const dialogRef = this.matDialog.open(PopcontactComponent, {
    data: {nomC: this.nomContact,
           contacts: this.Contacts,
           contactsSo: this.ContactsSo,
           idContact: this.idContact,
           NomSociete: this.soci
           }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
      this.optionsContact.push(result.nomC);
      this.Contacts = result.contacts;
      this.idContact = this.idContact + 1;
      this.ContactsSo = result.contactsSo;
    }
  });
}

// tslint:disable-next-line: typedef
openDialogTransport() {
  const dialogConfig = new MatDialogConfig();
  const dialogRef = this.matDialog.open(PoptransportComponent, {
    data: { listTr: this.Transports, listOpt: this.optionsT}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
      this.Transports = result.listTr;
      this.optionsT = result.listOpt;
    }
  });
}

// tslint:disable-next-line: typedef
openDialogMat() {
  const dialogConfig = new MatDialogConfig();
  const dialogRef = this.matDialog.open(PopmatComponent, {
    data: { listMat: this.Materiels, listOption: this.optionsM, listEle: this.listElement}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined){
      this.Materiels = result.listMat;
      this.optionsM = result.listOption;
      this.listElement = result.listEle;
    }
  });
}

/*********************************************** */

delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

async loadData() {
  this.loadSocietes();
  await this.delay(100);
  this.loadChantier();
  await this.delay(100);
  this.loadMateriel();
  await this.delay(100);
  this.loadProduit();
  await this.delay(100);
  this.loadTransport();
  await this.delay(100);
  this.loadContact();
  await this.delay(100);
  this.loadContactSo();
  await this.delay(100);
  this.loadCondi();
  await this.delay(100);
  this.loadKit();
  await this.delay(100);
  this.loadKitContenu();
  await this.delay(100);
  this.loadDevis();
  await this.delay(100);
}


ngOnInit(): void {
  // Récupere les données au lancement

  this.loadData();
  console.log(this.dateAct.getMonth());
  for ( let i = 0; i < 12; i++){
    if ( this.dateAct.getMonth() === 0){
      this.date = this.dateAct.getDate() + ' Janvier ' + this.dateAct.getFullYear();
    }
    else if ( this.dateAct.getMonth() === 1){
      this.date = this.dateAct.getDate() + ' Février ' + this.dateAct.getFullYear();
    }
    else if ( this.dateAct.getMonth() === 2){
      this.date = this.dateAct.getDate() + ' Mars ' + this.dateAct.getFullYear();
    }
    else if ( this.dateAct.getMonth() === 3){
      this.date = this.dateAct.getDate() + ' Avril ' + this.dateAct.getFullYear();
    }
    else if ( this.dateAct.getMonth() === 4){
      this.date = this.dateAct.getDate() + ' Mai ' + this.dateAct.getFullYear();
    }
    else if ( this.dateAct.getMonth() === 5){
      this.date = this.dateAct.getDate() + ' Juin ' + this.dateAct.getFullYear();
    }
    else if ( this.dateAct.getMonth() === 6){
      this.date = this.dateAct.getDate() + ' Juillet ' + this.dateAct.getFullYear();
    }
    else if ( this.dateAct.getMonth() === 7){
      this.date = this.dateAct.getDate() + ' Aout ' + this.dateAct.getFullYear();
    }
    else if ( this.dateAct.getMonth() === 8){
      this.date = this.dateAct.getDate() + ' Septembre ' + this.dateAct.getFullYear();
    }
    else if ( this.dateAct.getMonth() === 9){
      this.date = this.dateAct.getDate() + ' Octobre ' + this.dateAct.getFullYear();
    }
    else if ( this.dateAct.getMonth() === 10){
      this.date = this.dateAct.getDate() + ' Novembre ' + this.dateAct.getFullYear();
    }
    else if ( this.dateAct.getMonth() === 11){
      this.date = this.dateAct.getDate() + ' Decembre ' + this.dateAct.getFullYear();
    }
  }
  this.idDevis = this.dateAct.getFullYear() + '_' + this.nomEmetteur[0] + this.prenomEmetteur[0] + '_' + this.nbDevis;
  this.nomEmetteur = this.auth.nomUser;
  this.prenomEmetteur = this.auth.prenomUser;
  console.log(this.nomEmetteur);
  console.log(this.prenomEmetteur);

  if ( this.devisServ.modifDevis === true) {
    let societe = this.devisServ.getSocieteM();
    let chantier = this.devisServ.getChantierM();
    let contact = this.devisServ.getContactM();
    let devis = this.devisServ.getDevisM();
    PRESTATION_INFO = this.devisServ.getConsoM();
    LOCATION_INFO = this.devisServ.getLocaM();
    MO_INFO = this.devisServ.getMoM();
    TRANSPORT_INFO = this.devisServ.getTrM();
    this.presSource = new MatTableDataSource<Prestation>(PRESTATION_INFO);
    this.locSource = new MatTableDataSource<Location>(LOCATION_INFO);
    this.moSource = new MatTableDataSource<Mo>(MO_INFO);
    this.trSource = new MatTableDataSource<Transport>(TRANSPORT_INFO);
    this.idDevis = this.devisServ.idDevisM;
    let nb = 1;
    for (let i of this.listIdDevis){
      if (i.search('-')){
        nb = nb + 1;
      }
    }
    if ( nb === 1){
      this.idDevis = this.idDevis + '-A';
    }
    else {
      this.idDevis = this.idDevis.substr(0, 8);
      this.idDevis = this.idDevis + String.fromCharCode(64 + nb);
    }
    this.soci = societe.Nom;
    this.chan = chantier.Nom;
    this.nomContact = contact.Nom;
    this.objet = devis.Objet;
    this.date = devis.Date;
    this.dateLiv = devis.DateLivraison;
    this.condiRegle = devis.CondiRegle;
    this.condiPrix = devis.CondiPrix;
    this.delaisExec = devis.delaisExec;
    this.delais = devis.Delais;
    if ( this.soci !== ''){
      this.getInfoS();
      this.getInfoC();
      this.getInfoCo();
    }
    this.devisServ.setModifF();
  }

  // Verifie et change les options de l'autocomplete selon ce qui est écrit en temps réel pour les societes
  this.filteredOptionsS = this.ControlSociete.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.optionsSociete))
    );

  // Verifie et change les options de l'autocomplete selon ce qui est écrit en temps réel pour les chantiers
  this.filteredOptionsC = this.ControlChantier.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.optionsChantier))
    );

    // Verifie et change les options de l'autocomplete selon ce qui est écrit en temps réel pour les contacts
  this.filteredOptionsCo = this.ControlContact.valueChanges
  .pipe(
    startWith(''),
    map(value => this._filter(value, this.optionsContact))
  );

  // Verifie et change les options de l'autocomplete selon ce qui est écrit en temps réel pour les materiels
  this.filteredOptionsM = this.stateInputChange$.pipe(
    rxjsOps.debounceTime(300),
    rxjsOps.map((s: string) => this.optionsM.filter(nom => nom.toLowerCase().includes(s.toLowerCase())))
  );

  // Verifie et change les options de l'autocomplete selon ce qui est écrit en temps réel pour les references
  this.filteredOptionsRef = this.stateInputChange$.pipe(
    rxjsOps.debounceTime(300),
    rxjsOps.map((s: string) => this.optionsRef.filter(nom => nom.toLowerCase().includes(s.toLowerCase())))
  );

  // Verifie et change les options de l'autocomplete selon ce qui est écrit en temps réel pour les transports
  this.filteredOptionsT = this.stateInputChange$.pipe(
    rxjsOps.debounceTime(300),
    rxjsOps.map((s: string) => this.optionsT.filter(nom => nom.toLowerCase().includes(s.toLowerCase())))
  );

  // Verifie et change les options de l'autocomplete selon ce qui est écrit en temps réel pour les zone de transporte
  this.filteredOptionsZone = this.stateInputChange$.pipe(
    rxjsOps.debounceTime(300),
    rxjsOps.map((s: string) => this.optionsZone.filter(nom => nom.toLowerCase().includes(s.toLowerCase())))
  );
}

// Fonction pour le filtre
private _filter(value: string, options: string[]): string[] {
  const filterValue = value.toLowerCase();

  return options.filter(option => option.toLowerCase().includes(filterValue));
}

///////////////////////////////////////////////////
  // Fonction pour récupéré les données depuis la bdd

  // tslint:disable-next-line: typedef
  loadDevis() {
    return this.restApi.getDevis().subscribe((data: {}) => {
      this.Devis = data;
      let date = new Date();
      let a = date.getFullYear();
      let nb = 1;
      if (this.Devis.length !== 0) {
        for (let d of this.Devis){
          this.listIdDevis.push(d.idDevis);
          if ((d.idDevis.search(a)) !== -1 && (d.idDevis.search('-') !== -1)){
            nb = nb + 1;
          }
        }
      }
      this.nbDevis = nb;
    });
  }

  // tslint:disable-next-line: typedef
  loadSocietes() {
    return this.restApi.getSociete().subscribe((data: {}) => {
      // console.log(data);
      this.Societes = data;
      if (this.Societes.length !== 0){
        // console.log(this.Societes);
        for (let s of this.Societes){
          // console.log(s);
          this.optionsSociete.push(s['Nom']);
        }
      }
    });
  }

  // Fonction pour récupéré les chantiers
  // tslint:disable-next-line: typedef
  loadChantier() {
    return this.restApi.getChantier().subscribe((data: {}) => {
      // console.log(data);
      this.Chantiers = data;
      if (this.Chantiers.length !== 0){
        this.idChantier = this.Chantiers[this.Chantiers.length - 1].idChantier;
      }
    });
  }

  // Fonction pour récupéré les contacts
  // tslint:disable-next-line: typedef
  loadContact() {
    return this.restApi.getContact().subscribe((data: {}) => {
      // console.log(data);
      this.Contacts = data;
      if (this.Contacts.length !== 0){
        this.idContact = this.Contacts[this.Contacts.length - 1].idContact;
      }
    });
  }

  // Fonction pour récupéré les contacts de chantiers
  // tslint:disable-next-line: typedef
  loadContactSo() {
    return this.restApi.getContactSo().subscribe((data: {}) => {
      // console.log(data);
      this.ContactsSo = data;
      // console.log(this.ContactsSo);
    });
  }

  // Fonction por recupere les matériel
  // tslint:disable-next-line: typedef
  loadMateriel() {
    return this.restApi.getMateriel().subscribe((data: {}) => {
      // console.log(data);
      this.Materiels = data;
      for (let m of this.Materiels) {
        this.optionsM.push(m['Nom']);
        if (!this.NomMateriels.includes(m['Nom'])) {
          this.NomMateriels.push(m['Nom']);
        }
      }
    });
  }

  // Fonction por recupere les condis
  // tslint:disable-next-line: typedef
  loadCondi() {
    return this.restApi.getCondi().subscribe((data: {}) => {
      console.log(data);
      this.Conditions = data;
      let nb = 1;
      CONDI_INFO = [];
      for (let c of this.Conditions) {
        CONDI_INFO.push({position: nb, description: c.NomCondi});
      }
      this.condiSource = new MatTableDataSource<CONDI>(CONDI_INFO);
    });
  }

  // Fonction pour recupere les matériels
  // tslint:disable-next-line: typedef
  loadTransport() {
    return this.restApi.getTransport().subscribe((data: {}) => {
      // console.log(data);
      this.Transports = data;
      for (let t of this.Transports) {
        this.optionsT.push(t['Type']);
      }
    });
  }

  // Fonction pour recupere les produits
  // tslint:disable-next-line: typedef
  loadProduit() {
    return this.restApi.getProduit().subscribe((data: {}) => {
      this.Produits = data;
      /*for (let pos in this.Produits){
        if (!this.optionsM.includes(this.Produits[pos]['nom'])){
          this.optionsM.push(this.Produits[pos]['nom']);
        }
      }*/
      console.log('ma liste dedans', this.Produits);
    });
  }

  // tslint:disable-next-line: typedef
  loadKit() {
    return this.restApi.getKit().subscribe((data: {}) => {
      this.Kits = data;
      if (this.Kits.length !== 0){
        this.idKit = this.Kits[this.Kits.length - 1]['idKit'];
        for (let k of this.Kits){
          this.NomKits.push(k['NomKit']);
          this.optionsM.push(k['NomKit'])
      }
      }
    });
  }

  // tslint:disable-next-line: typedef
  loadKitContenu() {
    return this.restApi.getKitContenu().subscribe((data: {}) => {
      this.KitsContenu = data;
    });
  }

  getTailleText(s: string){
    let line = s.split('\n');
    let y = 0;
    for (let i = 0, l = line.length; i < l; i++) {
        y = y + 5;
    }
    return y;
  }

  setSaut(s: string){
    let sf = '';
    let tabMot = s.split(' ');
    let cL = s.length;
    let lmax = 110;
    let g = 1;
    let i = 0;
    let cptC = 0;
    let lAct = 0;
    while (cL > 110){
      while (g === 1){
        if (cptC + tabMot[i].length + 1 < lmax){
          cptC = cptC + tabMot[i].length + 1;
          i = i + 1;
        }
        else {
          g = 0;
        }
      }
      sf = sf + s.substr(0 + lAct, cptC + lAct) + '\n';
      lAct = lAct + cptC;
      cL = cL - cptC;
      cptC = 0;
      g = 1;
    }
    sf = sf + s.substr(lAct);
    return sf;
  }

// Fonction pour la génération de PDF
// tslint:disable-next-line: typedef
generatePDF() {

  if (this.soci !== '' && this.showInfosSociete){

    if (this.chan !== '' && this.showInfosChantier){

      if (this.nomContact !== '' && this.mailContact !== ''){

        if (this.delais !== ''){

          if (this.objet !== ''){

            let nbLigneP = PRESTATION_INFO.length;
            let nbLigneL = LOCATION_INFO.length;
            let nbLigneM = MO_INFO.length;
            let nbLigneT = TRANSPORT_INFO.length;

            if (nbLigneP !== 0 || nbLigneL !== 0 || nbLigneM !== 0 || nbLigneT !== 0){

              const doc = new jsPDF();
              doc.setFont('helvetica', 'normal');
              doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);

              /*doc.setDrawColor(0, 68, 137);
              doc.setFillColor(0, 68, 137);
              doc.rect(14, 35, 110, 5, 'F');
              doc.setFillColor(23, 158, 214);
              doc.setDrawColor(23, 158, 214);
              doc.rect(125, 35, 71, 5, 'F');

              doc.setDrawColor(0, 0, 0);*/

              doc.setFontSize(14);
              doc.text('Objet : ' + this.objet, 14, 115);
              doc.line(14, 115.5, 28, 115.5);
              doc.setFontSize(12);
              doc.text('Date : ' + this.date, 95, 125);
              doc.text('Délai de validité : ' + this.delais, 147, 125);
              if (this.dateLiv !== ''){
                doc.text('Date de livraison : ' + this.dateLiv, 14, 125);
              }
              else {
                doc.text('Date de livraison a convenir ', 14, 125);
              }
              doc.setFontSize(14);
              doc.text('Adresse de facturation :', 18, 68);
              doc.line(18, 68.5, 70, 68.5);
              doc.text('Adresse de livraison :', 114, 68);
              doc.line(114, 68.5, 161, 68.5);


              doc.setFontSize(12);
              doc.rect(14, 63, 86, 43);
              doc.text(this.soci, 18, 74);
              // doc.text(this.raisonS, 18, 80);
              // doc.text(this.siret, 18, 86);
              doc.text(this.adresseS, 18, 80);
              doc.text(this.cpS.toString() + ' ' + this.villeS, 18, 86);
              doc.text('Tel : ' + this.telS, 18, 92);

              doc.rect(110, 63, 86, 43);
              doc.text(this.chan, 114, 74);
              // Ajouter numero affaire
              doc.text(this.adresseC, 114, 80);
              doc.text(this.cpC.toString() + ' ' + this.villeC, 114, 86);
              doc.text('Contact : ' + this.nomContact, 114, 92);
              doc.text('Tel : ' + this.telContact, 114, 98);
              doc.text('Mail : ' + this.mailContact, 114, 104);

              doc.text('SOGEA CARONI', 158, 20);
              doc.text('ZI du Bonnel', 158, 26);
              doc.text('59167 LALLAING', 158, 32);
              doc.text('Tel : 0327928132', 158, 38);

              doc.text('Emetteur : ' + this.nomEmetteur + ' ' + this.prenomEmetteur, 14, 58);

              let cptLigne = 0;
              let cptTab = 0;
              let nbPage = 1;
              let yp = 135;
              let ypN = 60;
              let totalConso = 0;
              let totalLoc = 0;
              let totalMo = 0;
              let totalTr = 0;

              doc.setFontSize(8);
              doc.text('Page ' + nbPage, 195, 290);

              if (nbLigneP > 1) {

                cptTab = cptTab + 1;
                // let headers =  [ 'nom', 'nombre', 'prix/u ', 'total'];
                let headerst =  [['NOM', 'NOMBRE', 'PRIX/U ', 'TOTAL']];
                let data = [];
                let cpt = 1;
                for (let pre of PRESTATION_INFO) {
                  if (PRESTATION_INFO.indexOf(pre) !== PRESTATION_INFO.length - 1) {
                    // tslint:disable-next-line: max-line-length
                    // data.push({nom: pre.nom, 'prix/u ': pre['prix/u'].toString(), nombre: pre.nombre.toString(), total: pre.total.toString()});
                    cptLigne = cptLigne + 1 ;
                    cpt = cpt + 1;

                    if (((cptTab * 3 + cptLigne) === 22 && nbPage === 1) || ((cptTab * 3 + cptLigne) === 33 && nbPage > 1)) {
                      cptLigne = 1;
                      cptTab = 1;
                      nbPage = nbPage + 1;
                      // doc.table(60, yp, data , headers, { autoSize: true });
                      doc.setFontSize(14);
                      doc.text('Consommable :', 14, yp - 2);
                      doc.line(14, yp - 1.5, 48, yp - 1.5);
                      autoTable(doc, {
                        theme: 'striped',
                        startY: yp,
                        head: headerst,
                        body: data
                      });
                      yp = yp + (7.5 * cpt);
                      doc.setDrawColor(41, 128, 186);
                      doc.line(14, yp - 7.5, 196, yp - 7.5);
                      doc.setDrawColor(0, 0, 0);
                      doc.setFontSize(10);
                      doc.text('TOTAL sur la page suivante', 120, yp - 2.5);
                      yp = ypN;
                      data = [];
                      cpt = 2;
                      doc.addPage();
                      doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);

                      doc.setFontSize(12);
                      doc.text('SOGEA CARONI', 158, 20);
                      doc.text('ZI du Bonnel', 158, 26);
                      doc.text('59167 LALLAING', 158, 32);
                      doc.text('Tel : 0327928132', 158, 38);

                      doc.setFontSize(8);
                      doc.text('Page ' + nbPage, 195, 290);
                    }

                    data.push([pre.nom, pre.nombre.toString(), pre['prix/u'].toString() + ' €', pre.total.toString() + ' €']);
                    totalConso = totalConso + pre.total;
                  }
                }
                doc.setFontSize(14);
                doc.text('Consommable :', 14, yp - 2);
                doc.line(14, yp - 1.5, 48, yp - 1.5);
                autoTable(doc, {
                  theme: 'striped',
                  startY: yp,
                  head: headerst,
                  body: data
                });
                // doc.table(60, yp, data , headers, { autoSize: true });
                yp = yp + (7.5 * cpt) + 7.5;
                doc.setDrawColor(41, 128, 186);
                doc.line(14, yp - 7.5, 196, yp - 7.5);

                doc.setDrawColor(0, 0, 0);
                totalConso = Math.round(totalConso * 100) / 100;
                doc.setFontSize(10);
                doc.text('TOTAL', 120, yp - 2.5);
                doc.text(totalConso + ' €', 160, yp - 2.5);
                yp = yp + 7.5;
              }
              if (nbLigneL > 1) {

                cptTab = cptTab + 1;

                if (((cptTab * 3 + cptLigne) === 22 && nbPage === 1) || ((cptTab * 3 + cptLigne) === 33 && nbPage > 1)) {
                  cptLigne = 0;
                  cptTab = 1;
                  nbPage = nbPage + 1;
                  yp = ypN;
                  doc.addPage();
                  doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);

                  doc.setFontSize(12);
                  doc.text('SOGEA CARONI', 158, 20);
                  doc.text('ZI du Bonnel', 158, 26);
                  doc.text('59167 LALLAING', 158, 32);
                  doc.text('Tel : 0327928132', 158, 38);

                  doc.setFontSize(8);
                  doc.text('Page ' + nbPage, 195, 290);
                }

                // let headers = ['nom', 'prix/cal ', 'prix/mois', 'nombre', 'duree ', 'total'];
                let headerst = [['NOM', 'NOMBRE', 'PRIX/CAL ', 'PRIX/MOIS', 'DUREE ', 'TOTAL']];
                let data = [];
                let cpt = 1;
                for (let loc of LOCATION_INFO){
                  if (LOCATION_INFO.indexOf(loc) !== LOCATION_INFO.length - 1) {

                    cpt = cpt + 1;
                    cptLigne = cptLigne + 1 ;

                    if (((cptTab * 3 + cptLigne) === 22 && nbPage === 1) || ((cptTab * 3 + cptLigne) === 33 && nbPage > 1)) {
                      cptLigne = 1;
                      cptTab = 1;
                      nbPage = nbPage + 1;
                      // doc.table(60, yp, data , headers, { autoSize: true });
                      doc.setFontSize(14);
                      doc.text('Location :', 14, yp - 2);
                      doc.line(14, yp - 1.5, 34, yp - 1.5);
                      autoTable(doc, {
                        theme: 'striped',
                        startY: yp,
                        head: headerst,
                        body: data
                      });
                      yp = yp + (7.5 * cpt);
                      doc.setDrawColor(41, 128, 186);
                      doc.line(14, yp - 7.5, 196, yp - 7.5);
                      doc.setDrawColor(0, 0, 0);
                      doc.setFontSize(10);
                      doc.text('TOTAL sur la page suivante', 120, yp - 2.5);
                      yp = ypN;
                      data = [];
                      cpt = 2;
                      doc.addPage();
                      doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);

                      doc.setFontSize(12);
                      doc.text('SOGEA CARONI', 158, 20);
                      doc.text('ZI du Bonnel', 158, 26);
                      doc.text('59167 LALLAING', 158, 32);
                      doc.text('Tel : 0327928132', 158, 38);

                      doc.setFontSize(8);
                      doc.text('Page ' + nbPage, 195, 290);
                    }

                    // tslint:disable-next-line: max-line-length
                    data.push([loc.nom, loc.nombre.toString(),  loc['prix/cal'].toString() + ' €', loc['prix/mois'].toString()+ ' €', (loc.duree + ' ' + loc.typeDuree)  , loc.total.toString() + ' €']);
                    totalLoc = totalLoc + loc.total;
                  }
                }
                // doc.table(40, yp, data , headers, { autoSize: true });
                doc.setFontSize(14);
                doc.text('Location :', 14, yp - 2);
                doc.line(14, yp - 1.5, 34, yp - 1.5);
                autoTable(doc, {
                  theme: 'striped',
                  startY: yp,
                  head: headerst,
                  body: data
                });
                yp = yp + (7.5 * cpt) + 7.5;
                doc.setDrawColor(41, 128, 186);
                doc.line(14, yp - 7.5, 196, yp - 7.5);

                doc.setDrawColor(0, 0, 0);
                totalLoc = Math.round(totalLoc * 100) / 100;
                doc.setFontSize(10);
                doc.text('TOTAL', 120, yp - 2.5);
                doc.text(totalLoc + ' €', 160, yp - 2.5);
                yp = yp + 7.5;
              }
              if (nbLigneM > 1) {

                cptTab = cptTab + 1;

                if (((cptTab * 3 + cptLigne) === 22 && nbPage === 1) || ((cptTab * 3 + cptLigne) === 33 && nbPage > 1)) {
                  cptLigne = 0;
                  cptTab = 1;
                  nbPage = nbPage + 1;
                  yp = ypN;
                  doc.addPage();
                  doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);

                  doc.setFontSize(12);
                  doc.text('SOGEA CARONI', 158, 20);
                  doc.text('ZI du Bonnel', 158, 26);
                  doc.text('59167 LALLAING', 158, 32);
                  doc.text('Tel : 0327928132', 158, 38);

                  doc.setFontSize(8);
                  doc.text('Page ' + nbPage, 195, 290);
                }

                // let headers = [ 'designation', 'montantHoraire', 'temps', 'nombrePersonnes', 'total'];
                let headerst = [[ 'DESIGNATION', 'MONTANT HORAIRE', 'TEMPS', 'NOMBRE PERSONNES', 'TOTAL']];
                let data = [];
                let cpt = 1;
                for (let mo of MO_INFO){
                  if (MO_INFO.indexOf(mo) !== MO_INFO.length - 1) {

                    cpt = cpt + 1;
                    cptLigne = cptLigne + 1 ;

                    if (((cptTab * 3 + cptLigne) === 22 && nbPage === 1) || ((cptTab * 3 + cptLigne) === 33 && nbPage > 1)) {
                      cptLigne = 1;
                      cptTab = 1;
                      nbPage = nbPage + 1;
                      // doc.table(60, yp, data , headers, { autoSize: true });
                      doc.setFontSize(14);
                      doc.text("Main d'oeuvre :", 14, yp - 2);
                      doc.line(14, yp - 1.5, 46, yp - 1.5);
                      autoTable(doc, {
                        theme: 'striped',
                        startY: yp,
                        head: headerst,
                        body: data
                      });
                      yp = yp + (7.5 * cpt);
                      doc.setDrawColor(41, 128, 186);
                      doc.line(14, yp - 7.5, 196, yp - 7.5);
                      doc.setDrawColor(0, 0, 0);
                      doc.setFontSize(10);
                      doc.text('TOTAL sur la page suivante', 120, yp - 2.5);
                      yp = ypN;
                      data = [];
                      cpt = 2;
                      doc.addPage();
                      doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);

                      doc.setFontSize(12);
                      doc.text('SOGEA CARONI', 158, 20);
                      doc.text('ZI du Bonnel', 158, 26);
                      doc.text('59167 LALLAING', 158, 32);
                      doc.text('Tel : 0327928132', 158, 38);

                      doc.setFontSize(8);
                      doc.text('Page ' + nbPage, 195, 290);
                    }

                    // tslint:disable-next-line: max-line-length
                    data.push([mo.designation, mo.montantHoraire.toString() + ' €/h', mo.temps.toString() + ' heure(s)', mo.nombrePersonnes.toString(), mo.total.toString()+ ' €']);
                    totalMo = totalMo + mo.total;

                  }
                }
                // doc.table(40, yp, data , headers, { autoSize: true });
                doc.setFontSize(14);
                doc.text("Main d'oeuvre :", 14, yp - 2);
                doc.line(14, yp - 1.5, 46, yp - 1.5);
                autoTable(doc, {
                  theme: 'striped',
                  startY: yp,
                  head: headerst,
                  body: data
                });
                yp = yp + (7.5 * cpt) + 7.5;
                doc.setDrawColor(41, 128, 186);
                doc.line(14, yp - 7.5, 196, yp - 7.5);

                doc.setDrawColor(0, 0, 0);
                totalMo = Math.round(totalMo * 100) / 100;
                doc.setFontSize(10);
                doc.text('TOTAL', 120, yp - 2.5);
                doc.text(totalMo + ' €', 160, yp - 2.5);
                yp = yp + 7.5;
              }
              if (nbLigneT > 1) {

                cptTab = cptTab + 1;

                if (((cptTab * 3 + cptLigne) === 22 && nbPage === 1) || ((cptTab * 3 + cptLigne) === 33 && nbPage > 1)) {
                  cptLigne = 0;
                  cptTab = 1;
                  nbPage = nbPage + 1;
                  yp = ypN;
                  doc.addPage();
                  doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);

                  doc.setFontSize(12);
                  doc.text('SOGEA CARONI', 158, 20);
                  doc.text('ZI du Bonnel', 158, 26);
                  doc.text('59167 LALLAING', 158, 32);
                  doc.text('Tel : 0327928132', 158, 38);

                  doc.setFontSize(8);
                  doc.text('Page ' + nbPage, 195, 290);
                }

                // let headers = [ 'type', 'zone', 'montant'];
                let headerst = [[ 'TYPE', 'ZONE', 'MONTANT']];
                let data = [];
                let cpt = 1;
                for (let t of TRANSPORT_INFO){
                  if (TRANSPORT_INFO.indexOf(t) !== TRANSPORT_INFO.length - 1) {


                    cpt = cpt + 1;
                    cptLigne = cptLigne + 1 ;

                    if (((cptTab * 3 + cptLigne) === 22 && nbPage === 1) || ((cptTab * 3 + cptLigne) === 33 && nbPage > 1)) {
                      cptLigne = 1;
                      cptTab = 1;
                      nbPage = nbPage + 1;
                      // doc.table(60, yp, data , headers, { autoSize: true });
                      doc.setFontSize(14);
                      doc.text('Transport :', 14, yp - 2);
                      doc.line(14, yp - 1.5, 36, yp - 1.5);
                      autoTable(doc, {
                        theme: 'striped',
                        startY: yp,
                        head: headerst,
                        body: data
                      });
                      yp = yp + (7.5 * cpt);
                      doc.setDrawColor(41, 128, 186);
                      doc.line(14, yp - 7.5, 196, yp - 7.5);
                      doc.setDrawColor(0, 0, 0);
                      doc.setFontSize(10);
                      doc.text('TOTAL sur la page suivante', 120, yp - 2.5);
                      yp = ypN;
                      data = [];
                      cpt = 2;
                      doc.addPage();
                      doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);

                      doc.setFontSize(12);
                      doc.text('SOGEA CARONI', 158, 20);
                      doc.text('ZI du Bonnel', 158, 26);
                      doc.text('59167 LALLAING', 158, 32);
                      doc.text('Tel : 0327928132', 158, 38);

                      doc.setFontSize(8);
                      doc.text('Page ' + nbPage, 195, 290);
                    }

                    data.push([t.type, t.zone.toString(), t.montant.toString() + ' €']);
                    totalTr = totalTr + t.montant;

                  }
                }
                // doc.table(70, yp, data , headers, { autoSize: true });
                doc.setFontSize(14);
                doc.text('Transport :', 14, yp - 2);
                doc.line(14, yp - 1.5, 36, yp - 1.5);
                autoTable(doc, {
                  theme: 'striped',
                  startY: yp,
                  head: headerst,
                  body: data
                });
                yp = yp + (7.5 * cpt) + 7.5;
                doc.setDrawColor(41, 128, 186);
                doc.line(14, yp - 7.5, 196, yp - 7.5);

                doc.setDrawColor(0, 0, 0);
                totalTr = Math.round(totalTr * 100) / 100;
                doc.setFontSize(10);
                doc.text('TOTAL', 120, yp - 2.5);
                doc.text(totalTr + ' €', 160, yp - 2.5);
                yp = yp + 7.5;
              }

              let total = Math.round((totalConso + totalLoc + totalMo + totalTr) * 100) / 100;
              let tva = total * this.tva;
              tva = Math.round((tva) * 100) / 100;
              let ttc = Math.round((total + tva) * 100) / 100;

              if (((cptLigne + (cptTab * 3) < 14) && nbPage === 1) || (nbPage !== 1 && (cptLigne + (cptTab * 3) < 24))){
                yp = yp - 7.5;
                doc.setFontSize(10);
                doc.rect(14, yp + 3.5, 182, 9);
                doc.text('Note :', 18, yp + 6.5);

                doc.setFontSize(12);
                doc.text('SOGEA CARONI', 158, 20);
                doc.text('ZI du Bonnel', 158, 26);
                doc.text('59167 LALLAING', 158, 32);
                doc.text('Tel : 0327928132', 158, 38);

                doc.setFontSize(10);
                doc.rect(110, yp + 16.5, 86, 20);
                doc.text('Montant HT : ', 114, yp + 20.5);
                doc.text(total.toString() + ' €', 137, yp + 20.5);
                doc.text('TVA : ', 114, yp + 26.5);
                doc.text(tva.toString() + ' €', 137, yp + 26.5);
                doc.text('Montant TTC : ', 114, yp + 32.5);
                doc.text(ttc.toString() + ' €', 137, yp + 32.5);

                doc.rect(110, yp + 38.5, 86, 20);
                if (this.condiPrix !== ''){
                  doc.text('Conditions de prix : ' + this.condiPrix, 114, yp + 42.5);
                }
                else {
                  doc.text('Conditions de prix : Non spécifié', 114, yp + 42.5);
                }
                if ( this.condiRegle !== ''){
                  doc.text('Conditions de règlement : ' + this.condiRegle, 114, yp + 48.5);
                }
                else {
                  doc.text('Conditions de règlement : Non spécifié', 114, yp + 48.5);
                }
                if ( this.delaisExec !== ''){
                  doc.text("Délai d'exécution : " + this.delaisExec, 114, yp + 54.5);
                }
                else {
                  doc.text("Délai d'exécution : Non spécifié", 114, yp + 54.5);
                }

                doc.rect(14, yp + 16.5, 86, 42);
                doc.text('Signature "Bon ' + 'pour Accord", date et nom', 18, yp + 20.5);
              }
              else {
                nbPage = nbPage + 1;
                yp = ypN;

                doc.addPage();
                doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);
                doc.setFontSize(8);
                doc.text('Page ' + nbPage, 195, 290);

                doc.setFontSize(12);
                doc.text('SOGEA CARONI', 158, 20);
                doc.text('ZI du Bonnel', 158, 26);
                doc.text('59167 LALLAING', 158, 32);
                doc.text('Tel : 0327928132', 158, 38);

                doc.setFontSize(10);
                doc.rect(14, yp + 3.5, 182, 9);
                doc.text('Note :', 18, yp + 6.5);

                doc.rect(110, yp + 16.5, 86, 20);
                doc.text('Montant HT : ', 114, yp + 20.5);
                doc.text(total.toString() + ' €', 137, yp + 20.5);
                doc.text('TVA : ', 114, yp + 26.5);
                doc.text(tva.toString() + ' €', 137, yp + 26.5);
                doc.text('Montant TTC : ', 114, yp + 32.5);
                doc.text(ttc.toString() + ' €', 137, yp + 32.5);

                doc.rect(110, yp + 38.5, 86, 20);
                if (this.condiPrix !== ''){
                  doc.text('Conditions de prix : ' + this.condiPrix, 114, yp + 42.5);
                }
                else {
                  doc.text('Conditions de prix : Non spécifié', 114, yp + 42.5);
                }
                if ( this.condiRegle !== ''){
                  doc.text('Conditions de règlement : ' + this.condiRegle, 114, yp + 48.5);
                }
                else {
                  doc.text('Conditions de règlement : Non spécifié', 114, yp + 48.5);
                }
                if ( this.delaisExec !== ''){
                  doc.text("Délai d'exécution : " + this.delaisExec, 114, yp + 54.5);
                }
                else {
                  doc.text("Délai d'exécution : Non spécifié", 114, yp + 54.5);
                }

                doc.rect(14, yp + 16.5, 86, 42);
                doc.text('Signature "Bon ' + 'pour Accord", date et nom', 18, yp + 20.5);

              }

              if (this.listCondi.length !== 0){
                yp = yp + 60;
                if (yp + 5 > 280) {
                  yp = ypN;
                  nbPage = nbPage + 1;
                  doc.addPage();
                  doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);
                  doc.setFontSize(8);
                  doc.text('Page ' + nbPage, 195, 290);

                  doc.setFontSize(12);
                  doc.text('SOGEA CARONI', 158, 20);
                  doc.text('ZI du Bonnel', 158, 26);
                  doc.text('59167 LALLAING', 158, 32);
                  doc.text('Tel : 0327928132', 158, 38);
                }
                let yC = yp;
                let condi = '';
                for (let c of this.Conditions){
                  condi = c['Description'];
                  if (this.listCondi.includes(c['Description']) && this.Conditions.indexOf(c) === 0){
                    if (condi.length > 110) {
                      condi = this.setSaut(condi);
                    }
                    let tailleText = this.getTailleText(condi);
                    yC = yC + tailleText + 5;
                    if (yC > 280) {
                      yp = ypN;
                      yC = yp;
                      nbPage = nbPage + 1;
                      doc.addPage();
                      doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);
                      doc.setFontSize(8);
                      doc.text('Page ' + nbPage, 195, 290);

                      doc.setFontSize(12);
                      doc.text('SOGEA CARONI', 158, 20);
                      doc.text('ZI du Bonnel', 158, 26);
                      doc.text('59167 LALLAING', 158, 32);
                      doc.text('Tel : 0327928132', 158, 38);

                      doc.setFontSize(10);
                      doc.text(condi, 14, yp + 5);
                    } else {
                      doc.setFontSize(10);
                      doc.text(condi, 14, yp + 5 );
                      yp = yp + 5 + tailleText;
                    }
                  }
                  else if (this.listCondi.includes(c['Description'])){
                    if (condi.length > 110) {
                      condi = this.setSaut(condi);
                    }
                    let tailleText = this.getTailleText(c['Description']);
                    yC = yC + tailleText + 10;
                    if (yC > 280) {
                      yp = ypN;
                      yC = yp;
                      nbPage = nbPage + 1;
                      doc.addPage();
                      doc.addImage('../../assets/img/LogoSolumat.jpg', 'JPEG', 14, 10, 59.25, 24.15);
                      doc.setFontSize(8);
                      doc.text('Page ' + nbPage, 195, 290);

                      doc.setFontSize(12);
                      doc.text('SOGEA CARONI', 158, 20);
                      doc.text('ZI du Bonnel', 158, 26);
                      doc.text('59167 LALLAING', 158, 32);
                      doc.text('Tel : 0327928132', 158, 38);

                      doc.setFontSize(12);
                      doc.text('Conditions :', 14, yp + 5);
                      yp = yp + 5;
                      doc.setFontSize(10);
                      doc.text(condi, 14, yp + 5);
                    } else {
                      doc.setFontSize(12);
                      doc.text('Conditions :', 14, yp + 5);
                      yp = yp + 5;
                      doc.setFontSize(10);
                      doc.text(condi, 14, yp + 5 );
                      yp = yp + 5 + tailleText;
                    }
                  }
                }
              }

              doc.save('Devis ' + this.idDevis + '.pdf');

              this.devisServ.setPdfUrl(doc.output('datauristring'));

              // tslint:disable-next-line: max-line-length
              let dev = new Devis(this.idDevis, this.objet, this.nomEmetteur + ' ' + this.prenomEmetteur, this.date, this.delais, this.dateLiv, this.condiPrix, this.condiRegle, this.delaisExec);
              this.restApi.addDevis(dev).subscribe(r => { console.log(dev); });
              let devchan = new DevisChan(this.idDevis, this.idChantier);
              this.restApi.addDevisChan(devchan).subscribe(r => { console.log(devchan); });
              this.listCondi = [];
              if (nbLigneP > 1){
                let conso: Consommabledevis;
                for (let pre of PRESTATION_INFO) {
                  if (PRESTATION_INFO.indexOf(pre) !== PRESTATION_INFO.length - 1) {
                    // tslint:disable-next-line: max-line-length
                    conso = new Consommabledevis(this.idDevis, pre.reference, pre.nom, pre['prix/u'], pre.nombre, pre.remise, pre.remise, pre.total, pre.observation);
                    this.restApi.addConso(conso).subscribe(r => { console.log(conso); });
                  }
                }
              }
              if (nbLigneL > 1){
                let loca: Locationdevis;
                for (let loc of LOCATION_INFO) {
                  if (LOCATION_INFO.indexOf(loc) !== LOCATION_INFO.length - 1) {
                    // tslint:disable-next-line: max-line-length
                    loca = new Locationdevis(this.idDevis, loc.reference, loc.nom, loc['prix/cal'], loc['prix/mois'], loc.nombre, loc.duree, loc.typeDuree, loc.remise, loc.marge, loc.total, loc.observation);
                    this.restApi.addLoca(loca).subscribe(r => { console.log(loca); });
                  }
                }
              }
              if (nbLigneM > 1){
                let mo: Modevis;
                for (let m of MO_INFO) {
                  if (MO_INFO.indexOf(m) !== MO_INFO.length - 1) {
                    // tslint:disable-next-line: max-line-length
                    mo = new Modevis(this.idDevis, m.designation, m.montantHoraire, m.temps, m.nombrePersonnes, m.remise, m.marge, m.total);
                    this.restApi.addMo(mo).subscribe(r => { console.log(mo); });
                  }
                }
              }
              if (nbLigneT > 1){
                let tr: Transportdevis;
                for (let t of TRANSPORT_INFO) {
                  if (TRANSPORT_INFO.indexOf(t) !== TRANSPORT_INFO.length - 1) {
                    // tslint:disable-next-line: max-line-length
                    tr = new Transportdevis(this.idDevis, t.type, t.zone, t.montant, t.remise, t.marge, t.observation);
                    this.restApi.addTr(tr).subscribe(r => { console.log(tr); });
                  }
                }
              }
              PRESTATION_INFO.splice(0, PRESTATION_INFO.length - 1);
              LOCATION_INFO.splice(0, LOCATION_INFO.length - 1);
              MO_INFO.splice(0, MO_INFO.length - 1);
              TRANSPORT_INFO.splice(0, TRANSPORT_INFO.length - 1);
              this.presSource = new MatTableDataSource<Prestation>(PRESTATION_INFO);
              this.locSource = new MatTableDataSource<Location>(LOCATION_INFO);
              this.moSource = new MatTableDataSource<Mo>(MO_INFO);
              this.trSource = new MatTableDataSource<Transport>(TRANSPORT_INFO);
            }
            else {
              alert("Vous n'avez rien inserer dans au moins un tableau");
            }
          }
          else {
            alert("Vous n'avez pas mis d'objet");
          }
        }
        else {
          alert("Vous n'avez pas mis de délais");
        }
      }
      else {
        alert("Vous n'avez pas mis de contact");
      }
    }
    else {
      alert("Vous n'avez pas mis de chantier");
    }
  }
  else {
    alert("Vous n'avez pas mis de société");
  }
}

// Permet de vérifier si la société est présente et montre les données si elle est présente sinon elle affiche rien
// tslint:disable-next-line: typedef
getInfoS(){
  if (this.optionsSociete.includes(this.soci)){
    // console.log('OK');
    for (let s of this.Societes){
      if (s['Nom'] === this.soci){
        this.siret = s['Siret'];
        this.adresseS = s['Adresse'];
        this.villeS = s['Ville'];
        this.cpS = s['CodePostal'];
        this.telS = s['Telephone'];
        this.tva = s['Tva'];
      }
    }
    this.optionsChantier = [];
    for (let c of this.Chantiers){
      if (this.soci === c['NomSociete']) {
        this.optionsChantier.push(c['Nom']);
      }
    }
    this.idContacts = [];
    for (let co of this.ContactsSo){
      if (this.soci === co['NomSociete']) {
        this.idContacts.push(co['idContact']);
      }
    }
    this.getContactsList();
    this.showInfosSociete = true;
    if (this.showInfosChantier){
      this.showInfosChantier = false;
      this.chan = '';
      this.adresseC = '';
      this.villeC = '';
      this.cpC = '';
      this.margeC = 10;
      this.nomContact = '';
      this.telContact = '';
      this.mailContact = '';
    }
  }
  else {
    // console.log('KO');
    // console.log(this.options);
    // console.log(this.soci);
    this.showInfosSociete = false;
  }
}

// Permet de vérifier si le chantier est présent et montre les données si c'est le cas sinon cela affiche rien
// tslint:disable-next-line: typedef
getInfoC(){
  if (this.optionsChantier.includes(this.chan)){
    console.log('OK');
    for (let c of this.Chantiers){
      if (this.chan === c['Nom']) {
        this.adresseC = c['Adresse'];
        this.villeC = c['Ville'];
        this.cpC = c['CodePostal'];
        this.idChantier = c['idChantier'];
        this.margeC = c['Marge'];
      }
    }
    this.showInfosChantier = true;
  }
  else {
    console.log('KO');
    console.log(this.optionsChantier);
    console.log(this.chan);
    this.showInfosChantier = false;
  }
}

// tslint:disable-next-line: typedef
getContactsList(){
  this.optionsContact = [];
  for (let co of this.Contacts){
    for (let id of this.idContacts){
      if (co['idContact'] === id){
        this.optionsContact.push(co['Nom']);
      }
    }
  }
}

// tslint:disable-next-line: typedef
getInfoCo(){
  if (this.optionsContact.includes(this.nomContact)){
    // console.log('OK');
    for (let co of this.Contacts){
      if (this.nomContact === co['Nom']) {
        this.telContact = co['Telephone'];
        this.mailContact = co['Email'];
        this.devisServ.setMail(this.mailContact);
      }
    }
  }
  else {
    // console.log('KO');
    // console.log(this.optionsContact);
    // console.log(this.nomContact);
  }
}


// tslint:disable-next-line: typedef
getInfoPrestation(value: string, element: Prestation){
    if (this.optionsM.includes(value)) {
      if (this.NomMateriels.includes(value)){
        element.marge = this.margeC;
        for (let e of this.Materiels) {
          this.optionsRef.push(e['Ref']);
        }
        let nb = PRESTATION_INFO.indexOf(element);
        if (nb === PRESTATION_INFO.length - 1) {
          // tslint:disable-next-line: max-line-length
          PRESTATION_INFO.push({reference : '', nom: '', 'prix/u': 0, nombre : 0, remise: 0, marge: this.margeC, total: 0, observation: ''});
          this.presSource = new MatTableDataSource<Prestation>(PRESTATION_INFO);
        }
      }
      else if (this.NomKits.includes(value)){
        let nb = PRESTATION_INFO.indexOf(element) + 1;
        for (let k of this.Kits){
          console.log(k);
          if (k['NomKit'] === value){
            for (let ki of this.KitsContenu){
              console.log(ki);
              if (ki['idKit'] === k['idKit']){
                // tslint:disable-next-line: max-line-length
                PRESTATION_INFO.splice(nb, 0, {reference: '', nom: ki.nomElement, 'prix/u': 0, nombre: ki['nombre'], remise: 0, marge: this.margeC, total: 0, observation: ''});
              }
            }
          }
        }
        PRESTATION_INFO.splice(nb - 1, 1);
        this.presSource = new MatTableDataSource<Prestation>(PRESTATION_INFO);
      }
    }
    else if ( value !== '') {
      element.marge = this.margeC;
      let nb = PRESTATION_INFO.indexOf(element);
      if (nb === PRESTATION_INFO.length - 1) {
        PRESTATION_INFO.push({reference : '', nom: '', 'prix/u': 0, nombre : 0, remise: 0, marge: this.margeC, total: 0, observation: ''});
        this.presSource = new MatTableDataSource<Prestation>(PRESTATION_INFO);
      }
    }
    if (value === '' && element.reference === ''){
      if (PRESTATION_INFO.indexOf(element) !== PRESTATION_INFO.length - 1 && PRESTATION_INFO.indexOf(element) !== -1) {
        let nb = PRESTATION_INFO.indexOf(element);
        PRESTATION_INFO.splice(nb, 1);
        this.presSource = new MatTableDataSource<Prestation>(PRESTATION_INFO);
      }
    }
}

// tslint:disable-next-line: typedef
getInfoLocation(value: string, element: Location){
    if (this.optionsM.includes(value)) {
      element.marge = this.margeC;
      for (let e of this.Materiels){
        element['prix/cal'] = e['PrixCalendair'];
        this.optionsRef.push(e['Ref']);
      }
      let nb = LOCATION_INFO.indexOf(element);
      if (nb === LOCATION_INFO.length - 1) {
        // tslint:disable-next-line: max-line-length
        LOCATION_INFO.push({reference : '', nom: '', 'prix/cal': 0, 'prix/mois': 0, nombre : 0, duree: 0, typeDuree: '', remise: 0, marge: this.margeC, total: 0, observation: ''});
        this.locSource = new MatTableDataSource<Location>(LOCATION_INFO);
      }
    }
    else if (value !== ''){
      element.marge = this.margeC;
      let nb = LOCATION_INFO.indexOf(element);
      if (nb === LOCATION_INFO.length - 1) {
        // tslint:disable-next-line: max-line-length
        LOCATION_INFO.push({reference : '', nom: '', 'prix/cal': 0, 'prix/mois': 0, nombre : 0, duree: 0, typeDuree: '', remise: 0, marge: this.margeC, total: 0, observation: ''});
        this.locSource = new MatTableDataSource<Location>(LOCATION_INFO);
      }
    }
    if (value === '' && element.reference === ''){
      if (LOCATION_INFO.indexOf(element) !== LOCATION_INFO.length - 1 && LOCATION_INFO.indexOf(element) !== -1) {
        let nb = LOCATION_INFO.indexOf(element);
        LOCATION_INFO.splice(nb, 1);
        this.locSource = new MatTableDataSource<Location>(LOCATION_INFO);
      }
    }
  }

// tslint:disable-next-line: typedef
getInfoMo(value: string, element: Mo){
    if (value !== '') {
      element.marge = this.margeC;
      let nb = MO_INFO.indexOf(element);
      if (nb === MO_INFO.length - 1) {
        MO_INFO.push({designation : '', montantHoraire : 50, temps: 0, nombrePersonnes: 0, remise: 0, marge: this.margeC, total: 0});
        this.moSource = new MatTableDataSource<Mo>(MO_INFO);
      }
    }
    if (value === ''){
      if (MO_INFO.indexOf(element) !== MO_INFO.length - 1 && MO_INFO.indexOf(element) !== -1) {
        let nb = MO_INFO.indexOf(element);
        MO_INFO.splice(nb, 1);
        this.moSource = new MatTableDataSource<Mo>(MO_INFO);
      }
    }
}

// tslint:disable-next-line: typedef
getInfoTransport(value: string, element: Transport){
  if (this.optionsT.includes(value)) {
    element.marge = this.margeC;
    for (let e of this.Transports){
      if (value === e['Type']){
        this.optionsZone.push(e['Zone']);
      }
    }
    let nb = TRANSPORT_INFO.indexOf(element);
    if (nb === TRANSPORT_INFO.length - 1) {
      // tslint:disable-next-line: max-line-length
      TRANSPORT_INFO.push({type : '', zone : 0, montant : 0, remise: 0, marge: this.margeC, observation: ''});
      this.trSource = new MatTableDataSource<Transport>(TRANSPORT_INFO);
    }
  }
  else if (value !== ''){
    element.marge = this.margeC;
    let nb = TRANSPORT_INFO.indexOf(element);
    if (nb === TRANSPORT_INFO.length - 1) {
      // tslint:disable-next-line: max-line-length
      TRANSPORT_INFO.push({type : '', zone : 0, montant : 0, remise: 0, marge: this.margeC, observation: ''});
      this.trSource = new MatTableDataSource<Transport>(TRANSPORT_INFO);
    }
  }
  if (value === '' && element.type === ''){
    if (TRANSPORT_INFO.indexOf(element) !== TRANSPORT_INFO.length - 1 && TRANSPORT_INFO.indexOf(element) !== -1) {
      let nb = TRANSPORT_INFO.indexOf(element);
      TRANSPORT_INFO.splice(nb, 1);
      this.trSource = new MatTableDataSource<Transport>(TRANSPORT_INFO);
    }
  }
}

// tslint:disable-next-line: typedef
getInfoZone(value: string, element: Transport){
  if (this.optionsZone.includes(value)) {
    for (let t of this.Transports){
      if (t['Zone'] === value && t['Type'] === element.type){
        element.montant = t['Prix'];
      }
    }
  }
}

// tslint:disable-next-line: typedef
changePrixPrestation(element: Prestation){
  let prix = element['prix/u'];
  let marge = element.marge;
  let remise = element.remise;
  let nombre = element.nombre;
  element.total = (prix + (prix / 100 * marge) - (prix / 100 * remise)) * nombre;
  element.total = Math.round(element.total * 100) / 100;
}

// tslint:disable-next-line: typedef
changePrixLocation(element: Location){
  let prixj = element['prix/cal'];
  let prixm = prixj * 30.5;
  prixm = Math.round(prixm * 100) / 100;
  element['prix/mois'] = prixm;
  let marge = element.marge;
  let remise = element.remise;
  let nombre = element.nombre;
  if (element.typeDuree === 'jour') {
    element.total = (prixj + (prixj / 100 * marge) - (prixj / 100 * remise)) * nombre * element.duree;
    element.total = Math.round(element.total * 100) / 100;
  }
  else if (element.typeDuree === 'mois') {
    element.total = (prixm + (prixm / 100 * marge) - (prixm / 100 * remise)) * nombre * element.duree;
    element.total = Math.round(element.total * 100) / 100;
  }
  else if (element.typeDuree === ('annee')){
    element.total = (prixm + (prixm / 100 * marge) - (prixm / 100 * remise)) * nombre * 12 * element.duree;
    element.total = Math.round(element.total * 100) / 100;
  }
}

// tslint:disable-next-line: typedef
changePrixMo(element: Mo){
  let prix = element['montantHoraire'];
  let marge = element.marge;
  let remise = element.remise;
  let nbpers = element.nombrePersonnes;
  let nombre = element.temps;
  prix = prix * nbpers * nombre;
  element.total = (prix + (prix / 100 * marge) - (prix / 100 * remise));
  element.total = Math.round(element.total * 100) / 100;
}

}


