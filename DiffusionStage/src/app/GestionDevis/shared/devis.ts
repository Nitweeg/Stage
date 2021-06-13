export class Devis {
    idDevis!: string;
    Objet!: string;
    Emetteur!: string;
    Date!: string;
    Delais!: string;
    DateLivraison!: string;
    CondiPrix!: string;
    CondiRegle!: string;
    delaisExec!: string;

    constructor(idD: string, obj: string, emet: string, date: string, delais: string, delaisL: string, condiP: string, condiR: string, delaisE: string){
        this.idDevis = idD;
        this.Objet = obj;
        this.Emetteur = emet;
        this.Date = date;
        this.Delais = delais;
        this.DateLivraison = delaisL;
        this.CondiPrix = condiP;
        this.CondiRegle = condiR;
        this.delaisExec = delaisL;
    }
}
