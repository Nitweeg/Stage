export class Chantier {
    idChantier!: number;
    Nom!: string;
    Adresse!: string;
    CodePostal!: string;
    Ville!: string;
    NomSociete!: string;
    Marge!: number;

    constructor(nom: string, adresse: string, cp: string, ville: string, noms: string, marge: number) {
        this.Nom = nom;
        this.Adresse = adresse;
        this.CodePostal = cp;
        this.Ville = ville;
        this.NomSociete = noms;
        this.Marge = marge;
    }
}
