import { DataUtilComponent } from './../data-util/data-util.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../Model/user.model';
import { ApiRestService } from '../service/api-rest.service';

@Component({
  selector: 'app-popuputil',
  templateUrl: './popuputil.component.html',
  styleUrls: ['./popuputil.component.css']
})
export class PopuputilComponent implements OnInit {

  nom: any;
  mdp: any;
  groupe: any;

  nomR: any;
  prenomR: any;

  constructor(public dialogRef: MatDialogRef<PopuputilComponent>, 
    public restApi: ApiRestService,
    @Inject(MAT_DIALOG_DATA) public data: {listusers: any[]}) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close('Ajout effectué');
  }

  addUtilisateur() {
    const u = new User(this.nom, this.mdp,this.groupe, this.nomR, this.prenomR,);
    this.restApi.addUser(u).subscribe(prod =>
      console.log(u));
    this.data.listusers.push(u);
    this.dialogRef.close(this.data);
  }

}
