export class Kitcontenu {
    idKitContenu!: number;
    idKit!: number;
    nomElement!: string;
    nombre!: number;

    constructor(idK: number, nom: string, nb: number){
        this.idKit = idK;
        this.nomElement = nom;
        this.nombre = nb;
    }
}
