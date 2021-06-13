
export class Modevis {
    idDevis!: string;
    Designation!: string;
    MontantHoraire!: number;
    Temps!: number;
    NombrePersonne!: number;
    Remise!: number;
    Marge!: number;
    Total!: number;

    constructor(idD: string, desi: string, montHor: number, tps: number, nbPer: number, rem: number, mar: number, total: number){
        this.idDevis = idD;
        this.Designation = desi;
        this.MontantHoraire = montHor;
        this.Temps = tps;
        this.NombrePersonne = nbPer;
        this.Remise = rem;
        this.Marge = mar;
        this.Total = total;
    }
}
