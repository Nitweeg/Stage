import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Materiel } from './materiel';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Societe } from './societe';
import { Chantier } from './chantier';
import { Contact } from './contact';
import { ContactSo } from './contact-so';
import { Condi } from './condi';
import { Kit } from './kit';
import { Kitcontenu } from './kitcontenu';
import { Transport } from './transport';
import { Devis } from './devis';
import { Modevis } from './modevis';
import { Transportdevis } from './transportdevis';
import { Consommabledevis } from './consommabledevis';
import { Locationdevis } from './locationdevis';
import { DevisChan } from './devis-chan';
import { CondiDev } from './condi-dev';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://193.251.23.107:5500/data';  // distance
  // apiURL = 'http://192.168.1.2:5500/data';  // local
  devis = this.apiURL + '/Devis';

  constructor(private http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  // Toute les fonctions get all
  getMateriel(): Observable<Materiel[]> {
    return this.http.get<Materiel[]>( this.apiURL + '/Devis/Materiel')
    .pipe(
      catchError(this.handleError)
    );
  }

  getSociete(): Observable<Societe[]> {
    return this.http.get<Societe[]>( this.apiURL + '/Devis/Societe')
    .pipe(
      catchError(this.handleError)
    );
  }

  getChantier(): Observable<Chantier[]> {
    return this.http.get<Chantier[]>( this.apiURL + '/Devis/Chantier')
    .pipe(
      catchError(this.handleError)
    );
  }

  getTransport(): Observable<Transport[]> {
    return this.http.get<Transport[]>( this.apiURL + '/Devis/Transport')
    .pipe(
      catchError(this.handleError)
    );
  }

  getContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiURL + '/Devis/Contact')
    .pipe(
      catchError(this.handleError)
    );
  }

  getContactSo(): Observable<ContactSo[]> {
    return this.http.get<ContactSo[]>(this.apiURL + '/Devis/ContactSociete')
    .pipe(
      catchError(this.handleError)
    );
  }

  getCondi(): Observable<Condi[]> {
    return this.http.get<Condi[]>(this.apiURL + '/Devis/Conditions')
    .pipe(
      catchError(this.handleError)
    );
  }

  getKit(): Observable<Kit[]> {
    return this.http.get<Kit[]>(this.apiURL + '/Devis/Kit')
    .pipe(
      catchError(this.handleError)
    );
  }

  getKitContenu(): Observable<Kitcontenu[]> {
    return this.http.get<Kitcontenu[]>(this.apiURL + '/Devis/KitContenu')
    .pipe(
      catchError(this.handleError)
    );
  }

  getDevis(): Observable<Devis[]> {
    return this.http.get<Devis[]>(this.apiURL + '/Devis/Devis')
    .pipe(
      catchError(this.handleError)
    );
  }

  getCondiDev(): Observable<CondiDev[]> {
    return this.http.get<CondiDev[]>(this.apiURL + '/Devis/ConditionDevis')
    .pipe(
      catchError(this.handleError)
    );
  }

  getDevisChan(): Observable<DevisChan[]> {
    return this.http.get<DevisChan[]>(this.apiURL + '/Devis/ChantierDevis')
    .pipe(
      catchError(this.handleError)
    );
  }

  getConso(): Observable<Consommabledevis[]> {
    return this.http.get<Consommabledevis[]>(this.apiURL + '/Devis/ConsommableDevis')
    .pipe(
      catchError(this.handleError)
    );
  }

  getLoca(): Observable<Locationdevis[]> {
    return this.http.get<Locationdevis[]>(this.apiURL + '/Devis/LocationDevis')
    .pipe(
      catchError(this.handleError)
    );
  }

  getMo(): Observable<Modevis[]> {
    return this.http.get<Modevis[]>(this.apiURL + '/Devis/MoDevis')
    .pipe(
      catchError(this.handleError)
    );
  }

  getTran(): Observable<Transportdevis[]> {
    return this.http.get<Transportdevis[]>(this.apiURL + '/Devis/TransportDevis')
    .pipe(
      catchError(this.handleError)
    );
  }


  // ******************************************************************* */
  // get spécifique

  getSocieteNom(nom: string): Observable<Societe> {
    return this.http.post<Societe>( this.apiURL + '/get/Devis/Societe', { "where":{
      "0":{
          "arg1":"Nom",
          "arg2":nom,
          "operateur":"=",
          "conctlogic":""
      }}})
    .pipe(
      catchError(this.handleError)
    );
  }

  getProduit(): Observable<object> {
    let data = {
      "select":{
          "0":"produit.nom",
          "4":"assoproduitstock.quantiter as quantite",
          "7":"conditionnement.nom as uniter",
          "8":"produit.id"
      },
      "jointure": {
          "assoproduitstock": {
            "1": "produit.id",
            "2": "assoproduitstock.idProduit"
          },
          "conditionnement": {
            "1": "assoproduitstock.idConditionnement",
            "2": "conditionnement.id"
          }
      }
    };
    return this.http.post(this.apiURL + '/get/Stock/produit', data);
  }

  /************************************************************************** */
  // Toute les fonctions post

  addSociete(s: Societe): Observable<Societe> {
    return this.http.post<Societe>( this.apiURL + '/Devis/Societe', this.societeToJson(s))
    .pipe(
      catchError(this.handleError)
    );
  }

  addChantier(c: Chantier): Observable<Chantier> {
    return this.http.post<Chantier>( this.apiURL + '/Devis/Chantier', this.chantierToJson(c))
    .pipe(
      catchError(this.handleError)
    );
  }

  addMateriel(m: Materiel): Observable<Materiel> {
    return this.http.post<Materiel>( this.apiURL + '/Devis/Materiel', this.matToJson(m))
    .pipe(
      catchError(this.handleError)
    );
  }

  addCondi(co: Condi): Observable<Condi> {
    return this.http.post<Condi>( this.apiURL + '/Devis/Conditions', this.condiToJson(co))
    .pipe(
      catchError(this.handleError)
    );
  }

  addContact(co: Contact): Observable<Contact> {
    return this.http.post<Contact>( this.apiURL + '/Devis/Contact', this.contactToJson(co))
    .pipe(
      catchError(this.handleError)
    );
  }

  addContactSo(co: ContactSo): Observable<ContactSo> {
    return this.http.post<ContactSo>( this.apiURL + '/Devis/ContactSociete', this.contactSoToJson(co))
    .pipe(
      catchError(this.handleError)
    );
  }

  addTransport(t: Transport): Observable<Transport> {
    return this.http.post<Transport>( this.apiURL + '/Devis/Transport', this.transportToJson(t))
    .pipe(
      catchError(this.handleError)
    );
  }

  addKit(k: Kit): Observable<Kit> {
    return this.http.post<Kit>( this.apiURL + '/Devis/Kit', this.kitToJson(k))
    .pipe(
      catchError(this.handleError)
    );
  }

  addKitC(kc: Kitcontenu): Observable<Kitcontenu> {
    return this.http.post<Kitcontenu>( this.apiURL + '/Devis/KitContenu', this.kitCToJson(kc))
    .pipe(
      catchError(this.handleError)
    );
  }

  addDevis(d: Devis): Observable<Devis> {
    return this.http.post<Devis>( this.apiURL + '/Devis/Devis', this.devistoJson(d))
    .pipe(
      catchError(this.handleError)
    );
  }

  addCondiDev(c: CondiDev): Observable<CondiDev> {
    return this.http.post<CondiDev>( this.apiURL + '/Devis/ConditionDevis', this.condiDevtoJson(c))
    .pipe(
      catchError(this.handleError)
    );
  }

  addDevisChan(d: DevisChan): Observable<DevisChan> {
    return this.http.post<DevisChan>( this.apiURL + '/Devis/ChantierDevis', this.devisChantoJson(d))
    .pipe(
      catchError(this.handleError)
    );
  }

  addConso(c: Consommabledevis): Observable<Consommabledevis> {
    return this.http.post<Consommabledevis>( this.apiURL + '/Devis/ConsommableDevis', this.consotoJson(c))
    .pipe(
      catchError(this.handleError)
    );
  }

  addLoca(l: Locationdevis): Observable<Locationdevis> {
    return this.http.post<Locationdevis>( this.apiURL + '/Devis/LocationDevis', this.locatoJson(l))
    .pipe(
      catchError(this.handleError)
    );
  }

  addMo(m: Modevis): Observable<Modevis> {
    return this.http.post<Modevis>( this.apiURL + '/Devis/MoDevis', this.motoJson(m))
    .pipe(
      catchError(this.handleError)
    );
  }

  addTr(t: Transportdevis): Observable<Transportdevis> {
    return this.http.post<Transportdevis>( this.apiURL + '/Devis/TransportDevis', this.trtoJson(t))
    .pipe(
      catchError(this.handleError)
    );
  }

  // ******************************************************************* */

  suppContact(id: number): Observable<Contact> {
    return this.http.post<Contact>( this.apiURL + '/delete/Devis/Contact', {'idContact': id})
    .pipe(
      catchError(this.handleError)
    );
  }

  // tslint:disable-next-line: typedef
  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

 // Fonctions pour mettre sous format json les données pour être envoyé
 // tslint:disable-next-line: typedef
 societeToJson(s: Societe){
  // tslint:disable-next-line: max-line-length
  let js: any = {'Nom': s.Nom, 'Siret': s.Siret, 'Adresse': s.Adresse, 'CodePostal': s.CodePostal, 'Ville': s.Ville, 'Telephone': s.Telephone, 'Tva': s.Tva};
  return js;
 }

 // tslint:disable-next-line: typedef
 chantierToJson(c: Chantier){
  // tslint:disable-next-line: max-line-length
  let js: any = {'Nom': c.Nom, 'Adresse': c.Adresse, 'CodePostal': c.CodePostal, 'Ville': c.Ville, 'NomSociete': c.NomSociete, 'Marge': c.Marge};
  return js;
 }

 // tslint:disable-next-line: typedef
 matToJson(m: Materiel){
  // tslint:disable-next-line: max-line-length
  let js: any = {'Ref': m.Ref, 'Nom': m.Nom, 'Categorie': m.Categorie, 'PrixCalendair': m.PrixCalendair};
  return js;
 }

 // tslint:disable-next-line: typedef
 condiToJson(co: Condi){
  // tslint:disable-next-line: max-line-length
  let js: any = {'NomCondi': co.NomCondi, 'Description': co.Description, 'Prestation': co.Prestation, 'Location': co.Location, 'Mo': co.Mo, 'Transport': co.Transport };
  return js;
 }

 // tslint:disable-next-line: typedef
 transportToJson(t: Transport){
  // tslint:disable-next-line: max-line-length
  let js: any = {'Type': t.Type, 'Zone': t.Zone, 'Prix': t.Prix};
  return js;
 }

 // tslint:disable-next-line: typedef
 contactToJson(co: Contact){
  // tslint:disable-next-line: max-line-length
  let js: any = {'Nom': co.Nom, 'Email': co.Email, 'Telephone': co.Telephone };
  return js;
 }

 // tslint:disable-next-line: typedef
 contactSoToJson(co: ContactSo){
  // tslint:disable-next-line: max-line-length
  let js: any = {'idContact': co.idContact, 'NomSociete': co.NomSociete};
  return js;
 }

 // tslint:disable-next-line: typedef
 kitToJson(k: Kit){
  // tslint:disable-next-line: max-line-length
  let js: any = {'idKit': k.idKit, 'NomKit': k.NomKit};
  return js;
 }

 // tslint:disable-next-line: typedef
 kitCToJson(kc: Kitcontenu){
  // tslint:disable-next-line: max-line-length
  let js: any = {'idKitContenu': kc.idKitContenu, 'idKit': kc.idKit, 'nomElement': kc.nomElement, 'nombre': kc.nombre};
  return js;
 }

 // tslint:disable-next-line: typedef
 devistoJson(d: Devis){
   // tslint:disable-next-line: max-line-length
   let js: any = {'idDevis': d.idDevis, 'Objet': d.Objet, 'Emetteur': d.Emetteur, 'Date': d.Date, 'Delais': d.Delais, 'DateLivraison': d.DateLivraison, 'CondiPrix': d.CondiPrix, 'CondiRegle': d.CondiRegle, 'DelaisExec': d.delaisExec};
   return js;
 }

 // tslint:disable-next-line: typedef
 condiDevtoJson(c: CondiDev){
  // tslint:disable-next-line: max-line-length
  let js: any = {'idCondi': c.idCondi, 'idDevis': c.idDevis};
  return js;
 }

 // tslint:disable-next-line: typedef
 devisChantoJson(d: DevisChan){
  // tslint:disable-next-line: max-line-length
  let js: any = {'idDevis': d.idDevis, 'idChantier': d.idChantier};
  return js;
 }

 // tslint:disable-next-line: typedef
 motoJson(m: Modevis){
   // tslint:disable-next-line: max-line-length
   let js: any = {'idDevis': m.idDevis, 'Designation': m.Designation, 'MontantHoraire': m.MontantHoraire, 'Temps': m.Temps, 'NombrePersonne': m.NombrePersonne, 'Remise': m.Remise, 'Marge': m.Marge, 'Total': m.Total };
   return js;
 }

 // tslint:disable-next-line: typedef
 trtoJson(t: Transportdevis){
  // tslint:disable-next-line: max-line-length
  let js: any = {'idDevis': t.idDevis, 'Type': t.Type, 'Zone': t.Zone, 'Montant': t.Montant, 'Remise': t.Remise, 'Marge': t.Marge, 'Observation': t.Observation };
  return js;
}

// tslint:disable-next-line: typedef
consotoJson(c: Consommabledevis){
  // tslint:disable-next-line: max-line-length
  let js: any = {'idDevis': c.idDevis, 'Ref': c.Ref, 'Nom': c.Nom, 'PrixU': c['Prix/u'], 'Nombre': c.Nombre, 'Remise': c.Remise, 'Marge': c.Marge, 'Total': c.Total, 'Observation': c.Observation };
  return js;
}

// tslint:disable-next-line: typedef
locatoJson(l: Locationdevis){
  // tslint:disable-next-line: max-line-length
  let js: any = {'idDevis': l.idDevis, 'Ref': l.Ref, 'Nom': l.Nom, 'PrixCal': l['Prix/cal'], 'PrixMois': l['Prix/mois'], 'Nombre': l.Nombre, 'Duree': l.Duree, 'TypeDuree': l.TypeDuree, 'Remise': l.Remise, 'Marge': l.Marge, 'Total': l.Total, 'Observation': l.Observation };
  return js;
}

}
