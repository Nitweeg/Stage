export class Transportdevis {
    idDevis!: string;
    Type!: string;
    Zone!: number;
    Montant!: number;
    Remise!: number;
    Marge!: number;
    Observation!: string;

    constructor(idD: string, type: string, zone: number, mont: number, rem: number, mar: number, obs: string){
        this.idDevis = idD;
        this.Type = type;
        this.Zone = zone;
        this.Montant = mont;
        this.Remise = rem;
        this.Marge = mar;
        this.Observation = obs;
    }
}
