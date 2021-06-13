import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Materiel } from '../../shared/materiel';
import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-popmat',
  templateUrl: './popmat.component.html',
  styleUrls: ['./popmat.component.css']
})
export class PopmatComponent implements OnInit {
  ref = '';
  nom = '';
  cat = '';
  prix = 0;

  constructor(public dialogRef: MatDialogRef<PopmatComponent>,
              public restApi: RestApiService,
              @Inject(MAT_DIALOG_DATA) public data: {listMat: any[], listOption: string[], listEle: string[]}) { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line: typedef
  addMateriel() {
    if ( this.ref !== '' && this.nom !== '' && this.cat !== '' && this.prix !== 0){
      if (this.prix > 0){
        const m = new Materiel(this.ref, this.nom, this.cat, this.prix);
        this.restApi.addMateriel(m).subscribe(prod => console.log(m));
        this.data.listMat.push(m);
        this.data.listOption.push(m['Nom']);
        this.data.listEle.push(m['Nom']);
        this.dialogRef.close(this.data);
      }
      else {
        alert('Le prix doit être supérieur a 0');
      }
    }
    else {
      alert('Au moins un des champs est vide ou inchangé');
    }
  }


  // Permet de fermer la popup
  // tslint:disable-next-line: typedef
  close() {
    this.dialogRef.close();
  }
}
