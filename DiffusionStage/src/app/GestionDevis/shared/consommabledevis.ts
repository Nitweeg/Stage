export class Consommabledevis {
    idDevis!: string;
    Ref!: string;
    Nom!: string;
    'Prix/u'!: number;
    Nombre!: number;
    Remise!: number;
    Marge!: number;
    Total!: number;
    Observation!: string;

    constructor(idD: string, ref: string, nom: string, prix: number, nb: number, rem: number, mar: number, total: number, obs: string){
        this.idDevis = idD;
        this.Ref = ref;
        this.Nom = nom;
        this["Prix/u"] = prix;
        this.Nombre = nb;
        this.Remise = rem;
        this.Marge = mar;
        this.Total = total;
        this.Observation = obs;
    }
}
