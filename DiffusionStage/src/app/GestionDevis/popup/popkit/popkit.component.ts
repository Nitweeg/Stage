import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Kit } from '../../shared/kit';
import { Kitcontenu } from '../../shared/kitcontenu';
import { RestApiService } from '../../shared/rest-api.service';

// Interface type pour la liste de matériél du kit et celle de ceux qu'on souhaite ajouter
interface ListeMat {
  nom: string;
  nombre: number;
}

// Donnees temporaire pour les test :)
// tslint:disable-next-line: prefer-const
let LISTE_INFO = [
  {nom : '', nombre: 0}
];
let AJOUT_INFO = [
  {nom : '', nombre: 0}
];

@Component({
  selector: 'app-popkit',
  templateUrl: './popkit.component.html',
  styleUrls: ['./popkit.component.css']
})
export class PopkitComponent implements OnInit{

  // Données pour la barre de recherche de produits/matériel
  nom: any;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  // Données du kit
  nomKit = '';

  // Création des collones plus des données des deux tables
  Columns: string[] = ['nom', 'nombre', 'delete'];
  listeSource = new MatTableDataSource<ListeMat>(LISTE_INFO);
  ajoutSource = new MatTableDataSource<ListeMat>(AJOUT_INFO);

  constructor( public dialogRef: MatDialogRef<PopkitComponent>,
               public restApi: RestApiService,
               @Inject(MAT_DIALOG_DATA) public data: {listEle: any[], listOption: string[], idK: number, listKitC: any[], kit: Kit}){
    // Initialisation des deux tables avec les données
    AJOUT_INFO = [];
    LISTE_INFO = [];
    this.listeSource = new MatTableDataSource(LISTE_INFO);
    this.ajoutSource = new MatTableDataSource(AJOUT_INFO);

    for (let ele of this.data.listEle){
      this.options.push(ele);
    }
  }

  // Initialisation du filtre
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  // Fonction pour le filtre
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Permet de fermer la popup
  // tslint:disable-next-line: typedef
  close() {
    this.dialogRef.close();
  }

  // tslint:disable-next-line: typedef
  addCompo() {
    if (this.nom !== null) {
      AJOUT_INFO.push( {
        nom: this.nom,
        nombre: 0
      });
      this.ajoutSource = new MatTableDataSource(AJOUT_INFO);
      this.nom = '';
    }
  }

  // tslint:disable-next-line: typedef
  suppElement(element: ListeMat ) {
    if (AJOUT_INFO.includes(element)){
      let nb = AJOUT_INFO.indexOf(element);
      AJOUT_INFO.splice(nb, 1);
      this.ajoutSource = new MatTableDataSource(AJOUT_INFO);

    }
    else if (LISTE_INFO.includes(element)){
      let nb = LISTE_INFO.indexOf(element);
      LISTE_INFO.splice(nb, 1);
      this.listeSource = new MatTableDataSource(LISTE_INFO);
    }
  }

  // Permet l'ajout des matériel de la liste temporaire a la liste du kit
  // tslint:disable-next-line: typedef
  ajout() {
    console.log(LISTE_INFO);
    console.log(AJOUT_INFO);
    AJOUT_INFO.forEach( ligne => {
      if (ligne.nom != null && ligne.nombre !== 0) {
        LISTE_INFO.push( {
          nom: ligne.nom,
          nombre: ligne.nombre
        });
      }
    });
    AJOUT_INFO = [];
    this.ajoutSource = new MatTableDataSource(AJOUT_INFO);
    this.listeSource = new MatTableDataSource(LISTE_INFO);
    console.log(LISTE_INFO);
    console.log(AJOUT_INFO);
    return LISTE_INFO;
  }

  // tslint:disable-next-line: typedef
  creerkit(){
    if (this.nomKit !== ''){
      if (LISTE_INFO.length > 0){
        let kc: Kitcontenu;
        let idK = this.data.idK + 1;
        let k = new Kit(idK, 'Kit_' + this.nomKit);
        this.restApi.addKit(k).subscribe();
        this.data.kit = k;
        for (let k of LISTE_INFO){
          kc = new Kitcontenu(idK, k.nom, k.nombre);
          this.data.listKitC.push(kc);
          // this.restApi.addKitC(kc).subscribe();
        }
        LISTE_INFO = [];
        this.data.listOption.push(k['NomKit']);
        this.dialogRef.close(this.data);
      }
      else {
        alert('Kit vide');
      }
    }
    else {
      alert('Nom de kit vide');
    }
  }


}
