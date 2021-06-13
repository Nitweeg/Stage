export class Locationdevis {
    idDevis!: string;
    Ref!: string;
    Nom!: string;
    'Prix/cal'!: number;
    'Prix/mois'!: number;
    Nombre!: number;
    Duree!: number;
    TypeDuree!: string;
    Remise!: number;
    Marge!: number;
    Total!: number;
    Observation!: string;

    // tslint:disable-next-line: max-line-length
    constructor(idD: string, ref: string, nom: string, prixc: number, prixm: number, nb: number, duree: number, typeD: string, rem: number, mar: number, total: number, obs: string) {
        this.idDevis = idD;
        this.Ref = ref;
        this.Nom = nom;
        this["Prix/cal"] = prixc;
        this["Prix/mois"] = prixm;
        this.Nombre = nb;
        this.Duree = duree;
        this.TypeDuree = typeD;
        this.Remise = rem;
        this.Marge = mar;
        this.Total = total;
        this.Observation = obs;
    }
}
