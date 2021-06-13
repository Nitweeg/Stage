import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chantier } from '../../shared/chantier';
import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-popchantier',
  templateUrl: './popchantier.component.html',
  styleUrls: ['./popchantier.component.css']
})
export class PopchantierComponent implements OnInit {

  // Variable des différentes données des input pour constituer un chantier
  nom: any;
  adresse: any;
  code: any;
  ville: any;
  nomSociete: any = this.data.nomS;
  marge: any = 10;

  // DialogRef sert a faire de ce composant une pop up, restApi est le service permettant l'utilisation des requettes http,
  // Inject permet de recuperer la donnée data qui contient nomS, le nom de la société actuellement dans le champ société
  // tslint:disable-next-line: max-line-length
  constructor(public dialogRef: MatDialogRef<PopchantierComponent>, public restApi: RestApiService, @Inject(MAT_DIALOG_DATA) public data: {nomS: string, chantiers: any[], nomC: string}) { }

  ngOnInit(): void {
  }

  // Fonction pour ajouter le chantier qui est appeler en cliquant sur le bouton creer
  // tslint:disable-next-line: typedef
  addChantier() {
    if (this.nom !== '' ){
      const c = new Chantier(this.nom, this.adresse, this.code, this.ville, this.nomSociete, this.marge);
      this.restApi.addChantier(c).subscribe(prod => console.log(c));
      this.data.nomC = this.nom;
      this.data.chantiers.push(c);
      this.dialogRef.close(this.data);
    }
    else {
      alert("Vous n'avez pas mis de nom");
    }
  }

  // Permet de fermer la popup
  // tslint:disable-next-line: typedef
  close() {
    this.dialogRef.close();
  }

}
