import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DevisServiceService } from '../shared/devis-service.service';
import { Materiel } from '../shared/materiel';
import { RestApiService } from '../shared/rest-api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from 'src/app/NetworkP/service/auth.service';

interface Devis {
  idDevis: string;
  Emetteur: string;
  Date: string;
  Societe: string;
  Chantier: string;
  Afficher: string;
  Modifier: string;
}

const DEVIS_INFO = [
  {idDevis : '', Emetteur: '', Date: '', Societe: '', Chantier: '', Afficher: '', Modifier: ''},
];

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

const PRESTATION_INFO = [
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

const LOCATION_INFO = [
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

const MO_INFO = [
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

const TRANSPORT_INFO = [
  {type : '', zone : 0, montant : 0, remise: 0, marge: 0, observation: ''},
];

@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css']
})


export class ConsulterComponent implements OnInit {

  Materiel: any = [];
  mailContact = '';

  // devis
  Devis: any = [];
  DevisChan: any = [];
  listIdDevis: string[] = [];
  Conso: any = [];
  Loca: any = [];
  Mo: any = [];
  Tr: any = [];

  // societe, chantier, contact
  Societes: any = [];
  nomsSociete: string[] = [];
  Chantiers: any = [];
  nomsChantier: string[] = [];
  Contacts: any = [];
  ContactsSo: any = [];

  // condi, condiDev
  Conditions: any = [];
  ConditionsDev: any = [];

  // barre de recherche
  showInfo = false;
  rech = '';
  ControlR = new FormControl();
  optionsR: string[] = [];
  filteredOptionsR!: Observable<string[]>;
  ele: any;


  constructor(
    public restApi: RestApiService,
    public devisServ: DevisServiceService,
    public auth: AuthService
  ) { }

  Columns: string[] = ['idDevis', 'Emetteur', 'Date', 'Societe', 'Chantier', 'Afficher', 'Modifier'];
  dataSource = new MatTableDataSource<Devis>();

  sendMail() {
    for (let c of this.Conso){
      console.log(this.ele.idDevis + ' = ' + c.idDevis);
      if (this.ele.idDevis === c.idDevis){
        PRESTATION_INFO.push({reference: c.Ref, nom: c.Nom, 'prix/u': c.PrixU, nombre: c.Nombre, remise: c.Remise, marge: c.Marge, total: c.Total, observation: c.Observation});
      }
    }
    for (let l of this.Loca){
      if (this.ele.idDevis === l.idDevis){
        LOCATION_INFO.push({reference: l.Ref, nom: l.Nom, 'prix/cal': l.PrixCal, 'prix/mois': l.PrixMois, nombre: l.Nombre, duree: l.Duree, typeDuree: l.TypeDuree, remise: l.Remise, marge: l.Marge, total: l.Total, observation: l.Observation});
      }
    }
    for (let m of this.Mo){
      if (this.ele.idDevis === m.idDevis){
        MO_INFO.push({designation: m.Designation, montantHoraire: m.MontantHoraire, temps: m.Temps, nombrePersonnes: m.NombrePersonne, remise: m.Remise, marge: m.Marge, total: m.Total});
      }
    }
    for (let t of this.Tr){
      if (this.ele.idDevis === t.idDevis){
        TRANSPORT_INFO.push({type: t.Type, zone: t.Zone, montant: t.Montant, remise: t.Remise, marge: t.Marge, observation: t.Observation});
      }
    }
    let nbLigneP = PRESTATION_INFO.length;
    let nbLigneL = LOCATION_INFO.length;
    let nbLigneM = MO_INFO.length;
    let nbLigneT = TRANSPORT_INFO.length;
    let devis;
    let societe;
    let chantier;
    let contact;
    let listDescri = [];
    for (let d of this.Devis){
      if (this.ele.idDevis === d.idDevis){
        devis = d;
      }
    }
    for (let s of this.Societes){
      if (this.ele.Societe === s.Nom){
        societe = s;
      }
    }
    for (let c of this.Chantiers){
      if (this.ele.Chantier === c.Nom){
        chantier = c;
      }
    }
    for (let ch of this.ContactsSo){
      if (this.ele.Societe === ch.NomSociete){
        for (let c of this.Contacts){
          if (ch.idContact === c.idContact){
            contact = c;
          }
        }
      }
    }
    for (let c of this.ConditionsDev){
      if (c.idDevis === this.ele.idDevis){
        for (let co of this.Conditions){
          if (c.idCondi === co.idCondi){
            listDescri.push(co.Description);
          }
        }
      }
    }

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
              doc.text('Objet : ' + devis.Objet, 14, 115);
              doc.line(14, 115.5, 28, 115.5);
              doc.setFontSize(12);
              doc.text('Date : ' + this.ele.Date, 95, 125);
              doc.text('Délai de validité : ' + devis.Delais, 147, 125);
              if (devis.DateLivraison !== ''){
                doc.text('Date de livraison : ' + devis.DateLivraison, 14, 125);
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
              doc.text(societe.Nom, 18, 74);
              // doc.text(this.raisonS, 18, 80);
              // doc.text(this.siret, 18, 86);
              doc.text(societe.Adresse, 18, 80);
              doc.text(societe.CodePostal.toString() + ' ' + societe.Ville, 18, 86);
              doc.text('Tel : ' + societe.Telephone, 18, 92);

              doc.rect(110, 63, 86, 43);
              doc.text(chantier.Nom, 114, 74);
              // Ajouter numero affaire
              doc.text(chantier.Adresse, 114, 80);
              doc.text(chantier.CodePostal.toString() + ' ' + chantier.Ville, 114, 86);
              doc.text('Contact : ' + contact.Nom, 114, 92);
              doc.text('Tel : ' + contact.Telephone, 114, 98);
              doc.text('Mail : ' + contact.Email, 114, 104);

              doc.text('SOGEA CARONI', 158, 20);
              doc.text('ZI du Bonnel', 158, 26);
              doc.text('59167 LALLAING', 158, 32);
              doc.text('Tel : 0327928132', 158, 38);

              doc.text('Emetteur : ' + this.ele.Emetteur, 14, 58);

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
                  if (PRESTATION_INFO.indexOf(pre) !== 0 ){
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
                  if (LOCATION_INFO.indexOf(loc) !== 0) {
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
                  if (MO_INFO.indexOf(mo) !== 0) {
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
                  if (TRANSPORT_INFO.indexOf(t) !== 0) {

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
              let tva = Math.round((total * 0.2) * 100) / 100;
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
                if (devis.CondiPrix !== ''){
                  doc.text('Conditions de prix : ' + devis.CondiPrix, 114, yp + 42.5);
                }
                else {
                  doc.text('Conditions de prix : Non spécifié', 114, yp + 42.5);
                }
                if ( devis.CondiRegle !== ''){
                  doc.text('Conditions de règlement : ' + devis.CondiRegle, 114, yp + 48.5);
                }
                else {
                  doc.text('Conditions de règlement : Non spécifié', 114, yp + 48.5);
                }
                if ( devis.DelaisExec !== ''){
                  doc.text("Délai d'exécution : " + devis.DelaisExec, 114, yp + 54.5);
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
                if (devis.CondiPrix !== ''){
                  doc.text('Conditions de prix : ' + devis.CondiPrix, 114, yp + 42.5);
                }
                else {
                  doc.text('Conditions de prix : Non spécifié', 114, yp + 42.5);
                }
                if ( devis.CondiRegle !== ''){
                  doc.text('Conditions de règlement : ' + devis.CondiRegle, 114, yp + 48.5);
                }
                else {
                  doc.text('Conditions de règlement : Non spécifié', 114, yp + 48.5);
                }
                if ( devis.DelaisExec !== ''){
                  doc.text("Délai d'exécution : " + devis.DelaisExec, 114, yp + 54.5);
                }
                else {
                  doc.text("Délai d'exécution : Non spécifié", 114, yp + 54.5);
                }

                doc.rect(14, yp + 16.5, 86, 42);
                doc.text('Signature "Bon ' + 'pour Accord", date et nom', 18, yp + 20.5);

              }

              if (listDescri.length !== 0){
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
                  if (listDescri.includes(c['Description']) && this.Conditions.indexOf(c) === 0){
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
                  else if (listDescri.includes(c['Description'])){
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

              doc.save('Devis ' + this.ele.idDevis + '.pdf');
              this.mailContact = this.devisServ.getMail();
              let body = 'Bonjour,%0D%0A%0D%0Avoici ci-joint le devis ' + this.ele.idDevis + '.%0D%0A%0D%0ACordialement,%0D%0A' + this.auth.nomUser + ' ' + this.auth.prenomUser;
              window.open('mailto:' + this.mailContact + '?subject=Devis ' + this.ele.idDevis + '&body=' + body);
              PRESTATION_INFO.splice(0, PRESTATION_INFO.length - 1);
              LOCATION_INFO.splice(0, LOCATION_INFO.length - 1);
              MO_INFO.splice(0, MO_INFO.length - 1);
              TRANSPORT_INFO.splice(0, TRANSPORT_INFO.length - 1);

            }
  }


  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.loadData();

    if (this.devisServ.pdfUrl !== ''){
      let iframe = document.getElementById('pdf');
      iframe?.setAttribute('src', this.devisServ.pdfUrl);
    }

    this.filteredOptionsR = this.ControlR.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.optionsR))
    );
  }

  getDevis() {
    if (this.listIdDevis.includes(this.rech)){
      let chantierD = '';
      let societeD = '';
      let idC = 0;
      for (let d of this.Devis){
        if (d.idDevis === this.rech){
          for (let c of this.DevisChan){
            if (this.rech === c.idDevis){
              idC = c.idChantier;
              for (let ch of this.Chantiers){
                if ( idC === ch.idChantier){
                  chantierD = ch.Nom;
                  societeD = ch.NomSociete;
                }
              }
            }
          }
        this.dataSource.data.push({idDevis : d.idDevis, Emetteur: d.Emetteur, Date: d.Date, Societe: societeD, Chantier: chantierD, Afficher: '', Modifier: ''});
        }
        this.showInfo = true;
      }
    }
    else if (this.nomsSociete.includes(this.rech)){
      let idListCh = [];
      let idListD = [];
      let nomElist = [];
      let dateList = [];
      let nomsChantiers = [];
      let cpt = 0;
      for ( let c of this.Chantiers){
        for ( let ch of this.DevisChan){
          if ( this.rech === c.NomSociete){
            idListCh.push(c.idChantier);
            if (idListCh.includes(ch.idChantier)) {
              idListD.push(ch.idDevis);
              nomsChantiers.push(c.Nom);
            }
        }
      }
      }
      for ( let d of this.Devis){
        if (idListD.includes(d.idDevis)){
          nomElist.push(d.Emetteur);
          dateList.push(d.Date);
        }
      }
      for (let i = 0; i < idListD.length ; i++){
        this.dataSource.data.push({idDevis : idListD[i], Emetteur: nomElist[i], Date: dateList[i], Societe: this.rech, Chantier: nomsChantiers[i], Afficher: '', Modifier: ''});
      }
      this.showInfo = true;
    }
    else {
      this.showInfo = false;
    }
  }

  // Fonction pour le filtre
  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

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
    this.loadDevisChan();
    await this.delay(100);
    this.loadConso();
    await this.delay(100);
    this.loadLoca();
    await this.delay(100);
    this.loadMo();
    await this.delay(100);
    this.loadTr();
    await this.delay(100);
    }

  async loadLigne(){
    this.loadConso();
    await this.delay(100);
    this.loadLoca();
    await this.delay(100);
    this.loadMo();
    await this.delay(100);
    this.loadTr();
    await this.delay(100);
  }

  loadConso(){
    return this.restApi.getConso().subscribe((data: {}) => {
      this.Conso = data;
    });
  }

  loadLoca(){
    return this.restApi.getLoca().subscribe((data: {}) => {
      this.Loca = data;
    });
  }

  loadMo(){
    return this.restApi.getMo().subscribe((data: {}) => {
      this.Mo = data;
    });
  }

  loadTr(){
    return this.restApi.getTran().subscribe((data: {}) => {
      this.Tr = data;
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

  showPDF(ele: Devis) {
    this.ele = ele;
    for (let c of this.Conso){
      console.log(ele.idDevis + ' = ' + c.idDevis);
      if (ele.idDevis === c.idDevis){
        PRESTATION_INFO.push({reference: c.Ref, nom: c.Nom, 'prix/u': c.PrixU, nombre: c.Nombre, remise: c.Remise, marge: c.Marge, total: c.Total, observation: c.Observation});
      }
    }
    for (let l of this.Loca){
      if (ele.idDevis === l.idDevis){
        LOCATION_INFO.push({reference: l.Ref, nom: l.Nom, 'prix/cal': l.PrixCal, 'prix/mois': l.PrixMois, nombre: l.Nombre, duree: l.Duree, typeDuree: l.TypeDuree, remise: l.Remise, marge: l.Marge, total: l.Total, observation: l.Observation});
      }
    }
    for (let m of this.Mo){
      if (ele.idDevis === m.idDevis){
        MO_INFO.push({designation: m.Designation, montantHoraire: m.MontantHoraire, temps: m.Temps, nombrePersonnes: m.NombrePersonne, remise: m.Remise, marge: m.Marge, total: m.Total});
      }
    }
    for (let t of this.Tr){
      if (ele.idDevis === t.idDevis){
        TRANSPORT_INFO.push({type: t.Type, zone: t.Zone, montant: t.Montant, remise: t.Remise, marge: t.Marge, observation: t.Observation});
      }
    }
    let nbLigneP = PRESTATION_INFO.length;
    let nbLigneL = LOCATION_INFO.length;
    let nbLigneM = MO_INFO.length;
    let nbLigneT = TRANSPORT_INFO.length;
    let devis;
    let societe;
    let chantier;
    let contact;
    let listDescri = [];
    for (let d of this.Devis){
      if (ele.idDevis === d.idDevis){
        devis = d;
      }
    }
    for (let s of this.Societes){
      if (ele.Societe === s.Nom){
        societe = s;
      }
    }
    for (let c of this.Chantiers){
      if (ele.Chantier === c.Nom){
        chantier = c;
      }
    }
    for (let ch of this.ContactsSo){
      if (ele.Societe === ch.NomSociete){
        for (let c of this.Contacts){
          if (ch.idContact === c.idContact){
            contact = c;
          }
        }
      }
    }
    for (let c of this.ConditionsDev){
      if (c.idDevis === ele.idDevis){
        for (let co of this.Conditions){
          if (c.idCondi === co.idCondi){
            listDescri.push(co.Description);
          }
        }
      }
    }

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
              doc.text('Objet : ' + devis.Objet, 14, 115);
              doc.line(14, 115.5, 28, 115.5);
              doc.setFontSize(12);
              doc.text('Date : ' + ele.Date, 95, 125);
              doc.text('Délai de validité : ' + devis.Delais, 147, 125);
              if (devis.DateLivraison !== ''){
                doc.text('Date de livraison : ' + devis.DateLivraison, 14, 125);
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
              doc.text(societe.Nom, 18, 74);
              // doc.text(this.raisonS, 18, 80);
              // doc.text(this.siret, 18, 86);
              doc.text(societe.Adresse, 18, 80);
              doc.text(societe.CodePostal.toString() + ' ' + societe.Ville, 18, 86);
              doc.text('Tel : ' + societe.Telephone, 18, 92);

              doc.rect(110, 63, 86, 43);
              doc.text(chantier.Nom, 114, 74);
              // Ajouter numero affaire
              doc.text(chantier.Adresse, 114, 80);
              doc.text(chantier.CodePostal.toString() + ' ' + chantier.Ville, 114, 86);
              doc.text('Contact : ' + contact.Nom, 114, 92);
              doc.text('Tel : ' + contact.Telephone, 114, 98);
              doc.text('Mail : ' + contact.Email, 114, 104);

              doc.text('SOGEA CARONI', 158, 20);
              doc.text('ZI du Bonnel', 158, 26);
              doc.text('59167 LALLAING', 158, 32);
              doc.text('Tel : 0327928132', 158, 38);

              doc.text('Emetteur : ' + ele.Emetteur, 14, 58);

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
                  if (PRESTATION_INFO.indexOf(pre) !== 0 ){
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
                  if (LOCATION_INFO.indexOf(loc) !== 0) {
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
                  if (MO_INFO.indexOf(mo) !== 0) {
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
                  if (TRANSPORT_INFO.indexOf(t) !== 0) {

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
              let tva = Math.round((total * 0.2) * 100) / 100;
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
                if (devis.CondiPrix !== ''){
                  doc.text('Conditions de prix : ' + devis.CondiPrix, 114, yp + 42.5);
                }
                else {
                  doc.text('Conditions de prix : Non spécifié', 114, yp + 42.5);
                }
                if ( devis.CondiRegle !== ''){
                  doc.text('Conditions de règlement : ' + devis.CondiRegle, 114, yp + 48.5);
                }
                else {
                  doc.text('Conditions de règlement : Non spécifié', 114, yp + 48.5);
                }
                if ( devis.DelaisExec !== ''){
                  doc.text("Délai d'exécution : " + devis.DelaisExec, 114, yp + 54.5);
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
                if (devis.CondiPrix !== ''){
                  doc.text('Conditions de prix : ' + devis.CondiPrix, 114, yp + 42.5);
                }
                else {
                  doc.text('Conditions de prix : Non spécifié', 114, yp + 42.5);
                }
                if ( devis.CondiRegle !== ''){
                  doc.text('Conditions de règlement : ' + devis.CondiRegle, 114, yp + 48.5);
                }
                else {
                  doc.text('Conditions de règlement : Non spécifié', 114, yp + 48.5);
                }
                if ( devis.DelaisExec !== ''){
                  doc.text("Délai d'exécution : " + devis.DelaisExec, 114, yp + 54.5);
                }
                else {
                  doc.text("Délai d'exécution : Non spécifié", 114, yp + 54.5);
                }

                doc.rect(14, yp + 16.5, 86, 42);
                doc.text('Signature "Bon ' + 'pour Accord", date et nom', 18, yp + 20.5);

              }

              if (listDescri.length !== 0){
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
                  if (listDescri.includes(c['Description']) && this.Conditions.indexOf(c) === 0){
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
                  else if (listDescri.includes(c['Description'])){
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


              let iframe = document.getElementById('pdf');
              iframe?.setAttribute('src', doc.output('datauristring'));
              this.devisServ.setMail(contact.Email);
              PRESTATION_INFO.splice(0, PRESTATION_INFO.length - 1);
              LOCATION_INFO.splice(0, LOCATION_INFO.length - 1);
              MO_INFO.splice(0, MO_INFO.length - 1);
              TRANSPORT_INFO.splice(0, TRANSPORT_INFO.length - 1);

            }
  }

  updatePDF(){
    let nomS = '';
    PRESTATION_INFO.splice(0, PRESTATION_INFO.length);
    LOCATION_INFO.splice(0, LOCATION_INFO.length);
    MO_INFO.splice(0, MO_INFO.length);
    TRANSPORT_INFO.splice(0, TRANSPORT_INFO.length);
    this.devisServ.setIdDevisM(this.ele.idDevis);
    for (let s of this.Societes){
      if (this.ele.Societe === s.Nom){
        this.devisServ.setSocieteM(s);
        nomS = s.Nom;
      }
    }
    for (let c of this.Chantiers){
      if (this.ele.Chantier === c.Nom){
        this.devisServ.setChantierM(c);
      }
    }
    for (let cs of this.ContactsSo){
      if (nomS === cs.NomSociete){
        for (let c of this.Contacts){
          if (cs.idContact === c.idContact){
            this.devisServ.setContactM(c);
          }
        }
      }
    }
    for (let d of this.Devis){
      if( this.ele.idDevis === d.idDevis){
        this.devisServ.setDevisM(d);
      }
    }
    for (let c of this.Conso){
      console.log(this.ele.idDevis + ' = ' + c.idDevis);
      if (this.ele.idDevis === c.idDevis){
        PRESTATION_INFO.push({reference: c.Ref, nom: c.Nom, 'prix/u': c.PrixU, nombre: c.Nombre, remise: c.Remise, marge: c.Marge, total: c.Total, observation: c.Observation});
      }
    }
    for (let l of this.Loca){
      if (this.ele.idDevis === l.idDevis){
        LOCATION_INFO.push({reference: l.Ref, nom: l.Nom, 'prix/cal': l.PrixCal, 'prix/mois': l.PrixMois, nombre: l.Nombre, duree: l.Duree, typeDuree: l.TypeDuree, remise: l.Remise, marge: l.Marge, total: l.Total, observation: l.Observation});
      }
    }
    for (let m of this.Mo){
      if (this.ele.idDevis === m.idDevis){
        MO_INFO.push({designation: m.Designation, montantHoraire: m.MontantHoraire, temps: m.Temps, nombrePersonnes: m.NombrePersonne, remise: m.Remise, marge: m.Marge, total: m.Total});
      }
    }
    for (let t of this.Tr){
      if (this.ele.idDevis === t.idDevis){
        TRANSPORT_INFO.push({type: t.Type, zone: t.Zone, montant: t.Montant, remise: t.Remise, marge: t.Marge, observation: t.Observation});
      }
    }
    PRESTATION_INFO.push({reference : '', nom: '', 'prix/u': 0, nombre : 0, remise: 0, marge: 0, total: 0, observation: ''});
    LOCATION_INFO.push({reference : '', nom: '', 'prix/cal': 0, 'prix/mois': 0, nombre : 0, duree: 0, typeDuree: '', remise: 0, marge: 0, total: 0, observation: ''});
    MO_INFO.push({designation : '', montantHoraire : 50, temps: 0, nombrePersonnes: 0, remise: 0, marge: 0, total: 0});
    TRANSPORT_INFO.push({type : '', zone : 0, montant : 0, remise: 0, marge: 0, observation: ''});
    this.devisServ.setConsoM(PRESTATION_INFO);
    this.devisServ.setLocaM(LOCATION_INFO);
    this.devisServ.setMoM(MO_INFO);
    this.devisServ.setTrM(TRANSPORT_INFO);
    this.devisServ.setModifT();
  }

  loadDevis() {
    return this.restApi.getDevis().subscribe((data: {}) => {
      this.Devis = data;
      if (this.Devis.length !== 0) {
        for (let d of this.Devis){
          this.listIdDevis.push(d.idDevis);
          this.optionsR.push(d.idDevis);
        }
      }
    });
  }

  loadDevisChan() {
    return this.restApi.getDevisChan().subscribe((data: {}) => {
      this.DevisChan = data;
    });
  }

  loadSocietes() {
    return this.restApi.getSociete().subscribe((data: {}) => {
      // console.log(data);
      this.Societes = data;
      if (this.Societes.length !== 0){
        // console.log(this.Societes);
        for (let s of this.Societes){
          // console.log(s);
          this.nomsSociete.push(s['Nom']);
          this.optionsR.push(s['Nom']);
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
      console.log(this.Chantiers);
      for (let c of this.Chantiers){
        this.nomsChantier.push(c['Nom']);
      }
      /*if (this.Chantiers.length !== 0){
        this.idChantier = this.Chantiers[this.Chantiers.length - 1].idChantier;
      }*/
    });
  }

  // Fonction pour récupéré les contacts
  // tslint:disable-next-line: typedef
  loadContact() {
    return this.restApi.getContact().subscribe((data: {}) => {
      // console.log(data);
      this.Contacts = data;
      /*if (this.Contacts.length !== 0){
        this.idContact = this.Contacts[this.Contacts.length - 1].idContact;
      }*/
    });
  }

  // Fonction pour récupéré les contacts de chantiers
  // tslint:disable-next-line: typedef
  loadContactSo() {
    return this.restApi.getContactSo().subscribe((data: {}) => {
      // console.log(data);
      this.ContactsSo = data;
    });
  }

  // Fonction por recupere les condis
  // tslint:disable-next-line: typedef
  loadCondi() {
    return this.restApi.getCondi().subscribe((data: {}) => {
      console.log(data);
      this.Conditions = data;
    });
  }

  // Fonction por recupere les condis
  // tslint:disable-next-line: typedef
  loadCondiDev() {
    return this.restApi.getCondiDev().subscribe((data: {}) => {
      console.log(data);
      this.ConditionsDev = data;
    });
  }

  // Fonction pour recupere les matériels
  // tslint:disable-next-line: typedef
  loadTransport() {
    return this.restApi.getTransport().subscribe((data: {}) => {
      // console.log(data);
      /*this.Transports = data;
      for (let t of this.Transports) {
        this.optionsT.push(t['Type']);
      }*/
    });
  }


  // tslint:disable-next-line: typedef
  loadKit() {
    return this.restApi.getKit().subscribe((data: {}) => {
      /*this.Kits = data;
      if (this.Kits.length !== 0){
        this.idKit = this.Kits[this.Kits.length - 1]['idKit'];
        for (let k of this.Kits){
          this.NomKits.push(k['NomKit']);
          this.optionsM.push(k['NomKit'])
      }
      }*/
    });
  }

  // tslint:disable-next-line: typedef
  loadKitContenu() {
    return this.restApi.getKitContenu().subscribe((data: {}) => {
      // this.KitsContenu = data;
    });
  }

  // tslint:disable-next-line: typedef
  loadMateriel() {
    return this.restApi.getMateriel().subscribe((data: {}) => {
      console.log(data);
      this.Materiel = data;
    });
  }

}
