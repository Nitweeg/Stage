export class Materiel {
    idMateriel!: string;
    Ref!: string;
    Nom!: string;
    Categorie!: string;
    PrixCalendair!: number;

    constructor(ref: string, nom: string, cat: string, prix: number){
        this.Ref = ref;
        this.Nom = nom;
        this.Categorie = cat;
        this.PrixCalendair = prix;
    }
}
