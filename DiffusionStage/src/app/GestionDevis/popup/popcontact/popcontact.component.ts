import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../../shared/contact';
import { ContactSo } from '../../shared/contact-so';
import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-popcontact',
  templateUrl: './popcontact.component.html',
  styleUrls: ['./popcontact.component.css']
})
export class PopcontactComponent implements OnInit {

  nom = '';
  mail = '';
  tel = '';

  constructor(public dialogRef: MatDialogRef<PopcontactComponent>,
              public restApi: RestApiService,
              // tslint:disable-next-line: max-line-length
              @Inject(MAT_DIALOG_DATA) public data: {nomC: string, contacts: any[], contactsSo: any[], idContact: number, NomSociete: string }) { }

  ngOnInit(): void {
  }

  // Fonction qui permet l'ajout d'une contact et qui est appeler en cliquant sur le bouton creer
  // tslint:disable-next-line: typedef
  addContact() {
    if (this.nom !== '' && this.mail !== '' && this.tel !== ''){
      if (this.tel.length === 10 && this.tel.indexOf('0') === 0){
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.mail)){
          const c = new Contact(this.nom, this.mail, this.tel);
          this.restApi.addContact(c).subscribe(prod =>
            console.log(c));
          this.data.nomC = this.nom;
          c.idContact = this.data.idContact + 1;
          const cc = new ContactSo(c.idContact, this.data.NomSociete);
          this.restApi.addContactSo(cc).subscribe(prod =>
            console.log(cc));
          this.data.contacts.push(c);
          this.data.contactsSo.push(cc);
          this.dialogRef.close(this.data);
        }
        else {
          alert('Email incorrecte');
        }
      }
      else {
        alert('Numéro de telephone incorrecte');
      }
    }
    else {
      alert('Au moins un des champs est vide');
    }
  }

  // Permet de fermer la popup
  // tslint:disable-next-line: typedef
  close() {
    this.dialogRef.close();
  }

}
