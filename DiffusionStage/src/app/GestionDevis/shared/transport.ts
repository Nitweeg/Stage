export class Transport {
    Type!: string;
    Zone!: number;
    Prix!: number;

    constructor(type: string, zone: number, montant: number){
        this.Type = type;
        this.Zone = zone;
        this.Prix = montant;
    }
}
