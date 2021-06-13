export class Contact {
    idContact!: number;
    Nom!: string;
    Email!: string;
    Telephone!: string;

    constructor(nom: string, mail: string, tel: string){
        this.Nom = nom;
        this.Email = mail;
        this.Telephone = tel;
    }
}
