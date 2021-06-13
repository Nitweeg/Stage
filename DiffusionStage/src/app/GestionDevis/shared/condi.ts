export class Condi {
    idCondition!: number;
    NomCondi!: string;
    Description!: string;
    Prestation!: number;
    Location!: number;
    Mo!: number;
    Transport!: number;

    constructor(nom: string, descri: string, isPres: number, isLoc: number, isMo: number, isTra: number) {
        this.NomCondi = nom;
        this.Description = descri;
        this.Prestation = isPres;
        this.Location = isLoc;
        this.Mo = isMo;
        this.Transport = isTra;
    }
}
