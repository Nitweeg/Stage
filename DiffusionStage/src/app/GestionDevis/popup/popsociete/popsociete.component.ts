import { Component, ElementRef, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestApiService } from '../../shared/rest-api.service';
import { Societe } from '../../shared/societe';

@Component({
  selector: 'app-popsociete',
  templateUrl: './popsociete.component.html',
  styleUrls: ['./popsociete.component.css']
})
export class PopsocieteComponent implements OnInit {

  // Variable des différentes données pour constituer une societe
  nom = '';
  siret = '';
  adresse = '';
  code = '';
  ville = '';
  tel = '';
  tva: any = 1.2;

  // dialoRef sert a faire de ce composant une pop up, restApi est le service qui permet l'utilisation des requetes http
  // tslint:disable-next-line: max-line-length
  constructor(public dialogRef: MatDialogRef<PopsocieteComponent>, public restApi: RestApiService, @Inject(MAT_DIALOG_DATA) public data: {nomS: string, societes: any[]}) { }



  ngOnInit(): void {
  }

  // Fonction qui permet l'ajout d'une societe et qui est appeler en cliquant sur le bouton creer
  // tslint:disable-next-line: typedef
  addSociete() {
    // tslint:disable-next-line: max-line-length
    if (this.nom !== ''){
            const s = new Societe(this.nom, this.siret, this.adresse, this.code, this.ville, this.tel, this.tva);
            this.restApi.addSociete(s).subscribe(prod => console.log(s));
            this.data.nomS = this.nom;
            this.data.societes.push(s);
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

