export class Societe {
    Nom!: string;
    Siret!: string;
    Adresse!: string;
    CodePostal!: string;
    Ville!: string;
    Telephone!: string;
    Tva!: number;

    // tslint:disable-next-line: max-line-length
    constructor(nom: string, siret: string, adresse: string, code: string, ville: string, tel: string, tva: number) {
        this.Nom = nom;
        this.Siret = siret;
        this.Adresse = adresse;
        this.CodePostal = code;
        this.Ville = ville;
        this.Telephone = tel;
        this.Tva = tva;
    }
}
