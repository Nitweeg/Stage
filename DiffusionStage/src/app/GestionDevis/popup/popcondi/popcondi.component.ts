import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CondiData } from '../../devis/devis.component';
import { Condi } from '../../shared/condi';
import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-popcondi',
  templateUrl: './popcondi.component.html',
  styleUrls: ['./popcondi.component.css']
})
export class PopcondiComponent {

  descrip = '';
  nom = '';
  Prestation = false;
  nbP = 0;
  Location = false;
  nbL = 0;
  Mo = false;
  nbM = 0;
  Transport = false;
  nbT = 0;

  constructor( public dialogRef: MatDialogRef<PopcondiComponent>,
               public RestApi: RestApiService,
               @Inject(MAT_DIALOG_DATA) public data: CondiData){}

  // tslint:disable-next-line: typedef
  addCondi(){
    if (this.Prestation === true) {
      this.nbP = 1;
    }
    if (this.Location === true) {
      this.nbL = 1;
    }
    if (this.Mo === true) {
      this.nbM = 1;
    }
    if (this.Transport === true) {
      this.nbT = 1;
    }
    let co = new Condi(this.nom, this.descrip, this.nbP, this.nbL, this.nbM, this.nbT);
    this.RestApi.addCondi(co).subscribe(prod =>
    console.log(co));
    this.data.condi.description = this.nom;
    this.data.conditions.push(co);
    console.log(this.data.conditions);
    this.dialogRef.close(this.data);
  }

  // tslint:disable-next-line: typedef
  close() {
    this.dialogRef.close();
  }

}
