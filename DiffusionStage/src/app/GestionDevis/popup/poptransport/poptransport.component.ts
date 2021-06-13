import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestApiService } from '../../shared/rest-api.service';
import { Transport } from '../../shared/transport';

@Component({
  selector: 'app-poptransport',
  templateUrl: './poptransport.component.html',
  styleUrls: ['./poptransport.component.css']
})
export class PoptransportComponent implements OnInit {
  type = '';
  zone: any;
  montant = 0;

  constructor(public dialogRef: MatDialogRef<PoptransportComponent>,
              public restApi: RestApiService,
              @Inject(MAT_DIALOG_DATA) public data: {listTr: any[], listOpt: string[]}) { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line: typedef
  addTransport() {
    if ( this.type !== '' && this.zone !== 0 && this.montant !== 0) {
      if (this.montant > 0) {
          if (this.zone > 0 ) {
            const t = new Transport(this.type, this.zone, this.montant);
            this.restApi.addTransport(t).subscribe(prod => console.log(t));
            this.data.listTr.push(t);
            this.data.listOpt.push(this.type);
            this.dialogRef.close(this.data);
          }
          else {
            alert("La zone rentrée n'es pas correcte");
          }
      }
      else {
        alert('Le montant doit être supérieur a 0');
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
