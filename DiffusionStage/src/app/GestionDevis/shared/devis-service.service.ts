import { Injectable} from '@angular/core';
import { Chantier } from './chantier';
import { Contact } from './contact';
import { Devis } from './devis';
import { RestApiService } from './rest-api.service';
import { Societe } from './societe';

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

let PRESTATION_INFOM = [
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

let LOCATION_INFOM = [
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

let MO_INFOM = [
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

let TRANSPORT_INFOM = [
  {type : '', zone : 0, montant : 0, remise: 0, marge: 0, observation: ''},
];

interface CONDI {
  description: string;
  position: number;
}

const CONDI_INFO: CONDI[] = [
  {position: 1, description: 'Ajouter'},
];

@Injectable({
  providedIn: 'root'
})
export class DevisServiceService{
  pdfUrl = '';
  modifDevis = false;
  idDevisM = '';
  mail = '';

  chantierM: any;
  societeM: any;
  contactM: any;
  devisM: any;

  constructor(public restApi: RestApiService) { }


  // tslint:disable-next-line: typedef
  setPdfUrl(s: string){
    this.pdfUrl = s;
  }

  setChantierM(c: Chantier){
    this.chantierM = c;
  }

  setSocieteM(s: Societe){
    this.societeM = s;
  }

  setContactM(c: Contact){
    this.contactM = c;
  }

  setDevisM(d: Devis){
    this.devisM = d;
  }

  setConsoM(conso: Prestation[]){
    PRESTATION_INFOM = conso;
  }

  setLocaM(loca: Location[]){
    LOCATION_INFOM = loca;
  }

  setMoM(mo: Mo[]){
    MO_INFOM = mo;
  }

  setTrM(tr: Transport[]){
    TRANSPORT_INFOM = tr;
  }

  getSocieteM(){
    return this.societeM;
  }

  getChantierM(){
    return this.chantierM;
  }

  getContactM(){
    return this.contactM;
  }

  getDevisM(){
    return this.devisM;
  }

  getConsoM(){
    return PRESTATION_INFOM;
  }

  getLocaM(){
    return LOCATION_INFOM;
  }

  getMoM(){
    return MO_INFOM;
  }

  getTrM(){
    return TRANSPORT_INFOM;
  }

  setModifT(){
    this.modifDevis = true;
  }

  setModifF(){
    this.modifDevis = false;
  }

  getModif(){
    return this.modifDevis;
  }

  getidM() {
    return this.idDevisM;
  }

  setIdDevisM(id: string){
    this.idDevisM = id;
  }

  setMail(m: string) {
    this.mail = m;
  }

  getMail(){
    return this.mail;
  }


}
